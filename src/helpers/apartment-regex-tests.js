'use strict';

import _ from 'lodash';
import s from 'underscore.string';

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


    let cityPrefix = '(г(\.)?|город|пос(\.)?|пос(ё|е)лок)?(\ )?';
    if (/(В|в)ерхняя\ (П|п)ышма/.test(address.toLowerCase())) {
      context.address.city = 'Верхняя Пышма';
      address = address.replace(new RegExp(cityPrefix + 'Верхняя\ Пышма'), '');
    }
    else if (/(С|с)реднеуральск/.test(address.toLowerCase())) {
      context.address.city = 'Среднеуральск';
      address = address.replace(new RegExp(cityPrefix + 'Среднеуральск'), '');
    }
    else if (/(Б|б)ер(е|ё)зовский/.test(address.toLowerCase())) {
      context.address.city = 'Первоуральск';
      address = address.replace(new RegExp(cityPrefix + 'Бер(е|ё)зовский'), '');
    }
    else if (/(Ш|ш)увакиш/.test(address.toLowerCase())) {
      address = address.replace(new RegExp(cityPrefix + '(Ш|ш)увакиш'), '');
      context.address.city = 'пос. Шувакиш';
    }
    else if (/(З|з)аречный/.test(address.toLowerCase())) {
      address = address.replace(new RegExp(cityPrefix + '(З|з)аречный'), '');
      context.address.city = 'Заречный';
    }
    else if (/(\(.+\)|(Е|е)катеринбург)/.test(address.toLowerCase())) {
      address = address.replace(new RegExp(cityPrefix + 'Екатеринбург'), '');
      context.address.city = 'Екатеринбург';
    }
    else {
      context.address.city = 'Екатеринбург';
    }


    if (/(Ц|ц)ентр/.test(address.toLowerCase())) {
      address = address.replace(/(Ц|ц)ентр/, '');
      context.address.district = 'Центр';
    }
    else if (/(У|у)ралмаш/.test(address.toLowerCase())) {
      address = address.replace(/(У|у)ралмаш/, '');
      context.address.district = 'Уралмаш';
    }
    else if (/(Э|э)льмаш/.test(address.toLowerCase())) {
      address = address.replace(/(Э|э)льмаш/, '');
      context.address.district = 'Эльмаш';
    }
    else if (/(Х|х)им(м)?аш/.test(address.toLowerCase())) {
      address = address.replace(/(Х|х)им(м)?аш/, '');
      context.address.district = 'Химмаш';
    }
    else if (/(О|о)ктябрьски(й)?/.test(address.toLowerCase())) {
      address = address.replace(/(О|о)ктябрьски(й)?/, '');
      context.address.district = 'Октябрьский';
    }
    else if (/(П|п)ионерски(й)?/.test(address.toLowerCase())) {
      address = address.replace(/(П|п)ионерски(й)?/, '');
      context.address.district = 'Пионерский';
    }
    else if (/(Ж|ж)(Б|б)(И|и)/.test(address.toLowerCase())) {
      address = address.replace(/(Ж|ж)(Б|б)(И|и)/, '');
      context.address.district = 'ЖБИ';
    }
    else if (/((В|в)(И|и)(З|з))/.test(address.toLowerCase())) {
      address = address.replace(/(В|в)(И|и)(З|з)/, '');
      context.address.district = 'ВИЗ';
    }
    else if (/(В|в)торчермет/.test(address.toLowerCase())) {
      address = address.replace(/(В|в)торчермет/, '');
      context.address.district = 'Вторчермет';
    }
    else if (/(П|п)арковы(й)?/.test(address.toLowerCase())) {
      address = address.replace(/(П|п)арковы(й)?/, '');
      context.address.district = 'Парковый';
    }
    else if (/(А|а)втовокзал(ьный)?/.test(address.toLowerCase())) {
      address = address.replace(/(А|а)втовокзал(ьный)?/, '');
      context.address.district = 'Автовокзал';
    }
    else if (/(В|в)окзал(ьный)?/.test(address.toLowerCase())) {
      address = address.replace(/(В|в)окзал(ьный)?/, '');
      context.address.district = 'Вокзальный';
    }
    else if (/((С|с)тар(ая)?|(С|с)\.)\ (С|с)ортировк(а)?/.test(address.toLowerCase())) {
      address = address.replace(/((С|с)тар(ая)?|С\.)\ (С|с)ортировк(а)?/, '');
      context.address.district = 'Старая Сортировка';
    }
    else if (/((Н|н)ов(ая)?|Н\.)?\ ?(С|с)ортировк(а)?/.test(address.toLowerCase())) {
      address = address.replace(/((Н|н)ов(ая)?|Н\.)? (С|с)ортировк(а)?/, '');
      context.address.district = 'Новая Сортировка';
    }
    else if (/(А|а)кадеми(чес|чсе)к(ий)?/.test(address.toLowerCase())) {
      address = address.replace(/(А|а)кадеми(чес|чсе)к(ий)?/, '');
      context.address.district = 'Академический';
    }
    else if (/(Б|б)отани(ка|ческий)?/.test(address.toLowerCase())) {
      address = address.replace(/(Б|б)отани(ка|ческий)?/, '');
      context.address.district = 'Ботанический';
    }
    else if (/(У|у)ктус/.test(address.toLowerCase())) {
      address = address.replace(/(У|у)ктус/, '');
      context.address.district = 'Уктус';
    }
    else if (/(К|к)омпрессорны(й)?/.test(address.toLowerCase())) {
      address = address.replace(/(К|к)омпрессорны(й)?/, '');
      context.address.district = 'Компрессорный';
    }
    else if (/(Ш|ш)арташ/.test(address.toLowerCase())) {
      address = address.replace(/(Ш|ш)арташ/, '');
      context.address.district = 'Шарташ';
    }
    else if (/(К|к)ольцово/.test(address.toLowerCase())) {
      address = address.replace(/(К|к)ольцово/, '');
      context.address.district = 'Кольцово';
    }
    else if (/(К|к)раснолесье/.test(address.toLowerCase())) {
      address = address.replace(/(К|к)раснолесье/, '');
      context.address.district = '(К|к)раснолесье';
    }
    else if (/(У|у)(Н|н)(Ц|ц)|((У|у)ральский (Н|н)аучный (Ц|ц)ентр)/.test(address.toLowerCase())) {
      address = address.replace(/(У|у)(Н|н)(Ц|ц)|((У|у)ральский (Н|н)аучный (Ц|ц)ентр)/, '');
      context.address.district = 'УНЦ';
    }
    else if (/(Ш|ш)ирокая (Р|р)ечка/.test(address.toLowerCase())) {
      address = address.replace(/(Ш|ш)ирокая (Р|р)ечка/, '');
      context.address.district = 'Широкая Речка';
    }
    else if (/(Е|е)лизавет/.test(address.toLowerCase())) {
      address = address.replace(/(Е|е)лизавет/, '');
      context.address.district = 'Елизавет';
    }
    else if (/(С|с)ибирский (Т|т)ракт/.test(address.toLowerCase())) {
      address = address.replace(/(С|с)ибирский (Т|т)ракт/, '');
      context.address.district = 'Сибирский Тракт';
    }
    else if (/(С|с)ини(е|и)?(\ |\-|\_)?(К|к)амни/.test(address.toLowerCase())) {
      address = address.replace(/(С|с)ини(е|и)(\ |\-|\_)(К|к)амни/, '');
      context.address.district = 'Синии камни';
    }
    else if (/(В|в)(Т|т)(У|у)(З|з)((Г|г)ородок)?/.test(address.toLowerCase())) {
      address = address.replace(/(В|в)(Т|т)(У|у)(З|з)((Г|г)ородок)?/, '');
      context.address.district = 'Втузгородок';
    }
    else if (/(Ю|ю)го\ ?(-|\ |\_)?\ ?(З|з)апад(ный)?|(Ю|ю)(\-|\_|\ )?(З|з)/.test(address.toLowerCase())) {
      address = address.replace(/(Ю|ю)го\ ?(-|\ |\_)?\ ?(З|з)апад(ный)?|Ю(\-|\_|\ )?З/, '');
      context.address.district = 'Юго-Западный';
    }

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

    if (/подселение|комнат(а|ы)/.test(context.name.toLowerCase())) {
      context.type = 'private-room';
    }
    else if (/студи|малосе|однок|1\sкомнатн/.test(context.name.toLowerCase())) {
      context.type = 'apartment';
      context.rooms = 1;
    }
    else if (/двухк|2\sкомнатн/.test(context.name.toLowerCase())) {
      context.type = 'apartment';
      context.rooms = 2;
    }
    else if (/тр(ё|е)хк|3\sкомнатн/.test(context.name.toLowerCase())) {
      context.type = 'apartment';
      context.rooms = 3;
    }
    else if (/четыр(ё|е)хк|4\sкомнатн/.test(context.name.toLowerCase())) {
      context.type = 'apartment';
      context.rooms = 4;
    }
    else if (/пятик|5\sкомнатн/.test(context.name.toLowerCase())) {
      context.type = 'apartment';
      context.rooms = 5;
    }
    else if ((/\d/).test(context.name.toLowerCase())) {
      context.type = 'apartment';
      context.rooms = parseInt(context.name.toLowerCase().match(/\d/)[0]);
    }

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

export default applyTests;
