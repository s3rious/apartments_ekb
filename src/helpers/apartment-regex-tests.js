'use strict';

import _ from 'lodash';
import s from 'underscore.string';

import Filter from '../models/Filter';
let tests = Filter.getTests();

let applyTests = function (string, context) {

  let priceRx = /(С|с)тоимость(\ )?\:(\ )?/;
  if (priceRx.test(string.toLowerCase())) {
    context.price = {};
    let price = context.price.rawData = s(string).replace(priceRx, '').trim().value();

    if (/вс(ё|е)\ ?вкл|в\.?(в)\.?/.test(price.toLowerCase())) {
      context.price.allInclusive = true;
    }

    let gotNum = price.match(/\d{1,2}\ ?\d{3,99999}|\d{1,2}\.?\d{3,99999}|\d{1,99999}/);
    if (gotNum) {
      context.price.number = parseInt(gotNum[0].replace(/\s+|\.+/g, ''));
      if (context.price.number < 100) {
        context.price.number = context.price.number * 1000; // I'M NOT AFRAID TO GET DIRTY!
      }
    }

    let gotDeposit = price.split(/((Д|д)епо|(З|з)ал)[а-я|А-ЯеЁ]+\s+/);
    if (gotDeposit.length > 1) {
      context.price.needDeposit = true;
    }

    console.log(`... got a price...`, context.price);
    return false;
  }

  let contactsRx = /((К|к)онтактное\ (Л|л)ицо|(Т|т)елефон|(К|к)онтактный\ (Н|н)омер)(\ )?\:/;
  if (contactsRx.test(string.toLowerCase())) {
    context.contacts = s(string).replace(contactsRx, '').trim().value();
    console.log(`... got a contacts: ${context.contacts}...`);
    return false;
  }

  let addressRx = /((А|а)д(д)?рес(c)?)(\ )?\:(\ )?/;
  if (addressRx.test(string.toLowerCase())) {

    context.address = {};
    let address = context.address.rawData = s(string).replace(addressRx, '').trim().value();

    let cityPrefix = '(г\.?|город|пос\.?|пос(ё|е)лок)?(\s)?';
    tests.city.forEach((city) => {
      if (city.matcher.test(address.toLowerCase())) {
        address = address.replace(new RegExp(cityPrefix + city.matcher.source), '');
        context.address.city = city.name;
      }
    });

    if (!context.address.city) {
      context.address.city = 'Екатеринбург';
    }

    tests.district.forEach((district) => {
      if (district.matcher.test(address.toLowerCase())) {
        address = address.replace(district.matcher, '');
        context.address.district = district.name;
      }
    });

    context.address.street = s(address).replace(/\(\s?\)/, '').trim(/(\ |\,|\.)/).value();
    console.log(`... got an address...`, context.address);
    return false;
  }

  let photosRx = /(Ф|ф)ото(графии)?\s?\:\s?/;
  if (photosRx.test(string.toLowerCase())) {
    let vkAlbumRegex = /(http(s)?\:\/\/)?(m\.)?vk\.com\/album\-\d+_\d+/;

    if (vkAlbumRegex.test(string)) {
      context.photos = {
        album: string.match(vkAlbumRegex)[0]
      };
      console.log(`... got a photos...`, context.photos);
    }
    else {
      context.photos = null;
      console.log(`... photos not provided or not found...`);
    }

    return false;
  }

  let actualUntilRx = /(А|а)ктуально\ (Д|д)о(\ )?/;
  if (actualUntilRx.test(string.toLowerCase())) {
    let dateRegex = /\d{1,2}\.\d{1,2}.\d{2,4}/;
    if (dateRegex.test(string)) {
      context.actualUntil = string.match(dateRegex)[0];
      console.log(`... actual until ${context.actualUntil}`);
    }
    else {
      context.actualUntil = null;
      console.log(`... actual until unknowness.`);
    }

    return false;
  }

  let nameRx = /\([а-яА-Яеё\s]+(С|с)обствен(н)?ик(а)?|(Б|б)ез\s(К|к)ом[а-яА-Яеё\s]+\)/;
  if (nameRx.test(string.toLowerCase())) {

    context.name = s(string)
      .toLowerCase()
      .replace(nameRx, '')
      .replace(/объявлени(е)/, '')
      .replace(/(сда(ё|е)т(ь)?ся|сдам)\s?\:?/, '')
      .replace(/(\d)(\-)?([а-яеё])/, '$1 $3')
      .replace(/(\d)(\s|\-)?(х|я|ая)(\s|\.|\-)?/, '$1 ')
      .replace(/(\d)(\s|\-|\_)ком(н)?(\ |\.)/, '$1 комнатная ')
      .replace(/ком(н)?\.?\sкв/, 'комнатная кв')
      .replace(/кв(\s|\-|\_)р(а|у|е)/, 'квартир$2')
      .replace(/(\s|\.)кв(\s|$)/, ' квартира ')
      .replace(/(^(\)|\()\s*)|(\s|\.|\!|\,|\s*(\)|\()?)*$/, '')
      .replace(/\(.+$/, '')
      .humanize()
      .value();

    if (/собственник/.test(string.toLowerCase())) {
      context.hostType = 'owner';
    }
    else if (/без\ ком/.test(string.toLowerCase())) {
      context.hostType = 'without-a-commission';
    }
    else {
      context.hostType = 'unknown';
    }

    tests.type.forEach((type) => {
      if (type.matcher.test(context.name.toLowerCase())) {
        context.type = type.name;
      }
    });

    tests.rooms.forEach((rooms) => {
      if (rooms.matcher.test(context.name.toLowerCase())) {
        context.rooms = rooms.name;
      }
    });

    console.log(`... got a name: ${context.name}...`);
    return false;
  }

  let infoRx = /((Д|д)оп)(\.)?(\ )?\:(\ )/;
  if (infoRx.test(string.toLowerCase())) {
    context.info = s(string).replace(infoRx, '').trim().value();
    console.log(`... got an info: ${context.info}...`);
  }
  else {
    context.info = context.info + `\n${string}`;
    context.info = s(context.info).replace('undefined', '').trim().value();
  }
};

let processExcluded = (context) => {

  if (!context.price || !context.price.number || _(context.price.number).isNaN() || context.price.number < 1) {
    context.rejectReasons.push('unknown price');
    console.warn('... got a possible mismatch or unknown price, apartment will be excluded', context);
  }

  if (!context.address || (!context.address.district && context.address.city === 'Екатеринбург')) {
    context.rejectReasons.push('unknown location');
    console.warn('... got a possible mismatch or unknown city, apartment will be excluded', context);
  }

  if (!context.type) {
    context.rejectReasons.push('unknown type');
    console.warn('... got a possible mismatch or unknown type, apartment will be excluded', context);
  }

  if (context.type && context.type.hasRooms && !context.rooms) {
    context.rejectReasons.push('unknown number of rooms');
    console.warn('... got a possible mismatch or unknown number of rooms, apartment will be excluded', context);
  }
}

export default { applyTests, processExcluded} ;
