import _ from 'lodash';

class Filter {

  constructor () {

    this.withoutRejected = true;

    this.price = {
      from: 0,
      to: Infinity
    };

    this.shouldHavePhotos = false;

    this.type = [
      {
        name: 'Любой',
        isDefault: true,
        dontFilter: true
      },
      {
        name: 'Квартира',
        hasRooms: true,
        matcher: /^(?! подселение|комнат(а|ы)).*/
      },
      {
        name: 'Комната',
        matcher: /подселение|комнат(а|ы)/
      }
    ];

    this.rooms = [
      {
        name: 'Неважно',
        isDefault: true,
        dontFilter: true
      },
      {
        name: 1,
        matcher: /студи|малосе|однок|1\sкомнатн/
      },
      {
        name: 2,
        matcher: /двухк|2\sкомнатн/
      },
      {
        name: 3,
        matcher: /тр(ё|е)хк|3\sкомнатн/
      },
      {
        name: 4,
        matcher: /четыр(ё|е)хк|4\sкомнатн/
      },
      {
        name: 5,
        matcher: /пятик|5\sкомнатн/
      }
    ];

    this.city = [
      {
        name: 'Екатеринбург',
        matcher: /((Е|е)катеринбург)/,
        hasDistricts: true,
        isDefault: true
      },
      {
        name: 'Берёзовский',
        matcher: /(Б|б)ер(е|ё)зовский/
      },
      {
        name: 'Верхняя Пышма',
        matcher: /(В|в)\.?(ерхняя)?\s(П|п)ышма/
      },
      {
        name: 'Среднеуральск',
        matcher: /(С|с)реднеуральск/
      },
      {
        name: 'Первоуральск',
        matcher: /(П|п)реднеуральск/
      },
      {
        name: 'Заречный',
        matcher: /(З|з)аречный/
      },
      {
        name: 'пос. Шувакиш',
        matcher: /(Ш|ш)увакиш/
      }
    ];

    this.district = [
      {
        name: 'Любой',
        isDefault: true,
        dontFilter: true
      },
      {
        name: 'Центр',
        matcher: /(Ц|ц)ентр/
      },
      {
        name: 'Уралмаш',
        matcher: /(У|у)ралмаш/
      },
      {
        name: 'Эльмаш',
        matcher: /(Э|э)льмаш/
      },
      {
        name: 'Химмаш',
        matcher: /(Х|х)им(м)?аш/
      },
      {
        name: 'Октябрьский',
        matcher: /(О|о)ктябрьски(й)?/
      },
      {
        name: 'Пионерский',
        matcher: /(П|п)ионерски(й)?/
      },
      {
        name: 'ЖБИ',
        matcher: /(Ж|ж)(Б|б)(И|и)/
      },
      {
        name: 'ВИЗ',
        matcher: /(В|в)(И|и)(З|з)/
      },
      {
        name: 'Вторчермет',
        matcher: /(В|в)торчермет/
      },
      {
        name: 'Парковый',
        matcher: /(П|п)арковы(й)?/
      },
      {
        name: 'Автовокзал',
        matcher: /(А|а)втовокзал(ьный)?/
      },
      {
        name: 'Вокзальный',
        matcher: /(В|в)окзал(ьный)?/
      },
      {
        name: 'Старая Сортировка',
        matcher: /(С|с)ортировк(а)?/g
      },
      {
        name: 'Новая Сортировка',
        matcher: /.*\((?!(Ст?\.?\s?|Стар(ая)?\s?)).*(С|с)ортировк(а)?/ // Любая не Старая сортировка, и не просто Сортировка
      },
      {
        name: 'Академический',
        matcher: /(А|а)кадеми(чес|чсе)к(ий)?/
      },
      {
        name: 'Ботанический',
        matcher: /(Б|б)отани(ка|ческий)?/
      },
      {
        name: 'Уктус',
        matcher: /(У|у)ктус/
      },
      {
        name: 'Компрессорный',
        matcher: /(К|к)омпрессорны(й)?/
      },
      {
        name: 'Шарташ',
        matcher: /(Ш|ш)арташ/
      },
      {
        name: 'Кольцово',
        matcher: /(К|к)ольцово/
      },
      {
        name: 'Краснолесье',
        matcher: /(К|к)раснолесье/
      },
      {
        name: 'УНЦ',
        matcher: /(У|у)(Н|н)(Ц|ц)|((У|у)ральский (Н|н)аучный (Ц|ц)ентр)/
      },
      {
        name: 'Широкая Речка',
        matcher: /(Ш|ш)ирокая (Р|р)ечка/
      },
      {
        name: 'Елизавет',
        matcher: /(Е|е)лизавет/
      },
      {
        name: 'Сибирский Тракт',
        matcher: /(С|с)ибирский (Т|т)ракт/
      },
      {
        name: 'Синии камни',
        matcher: /(С|с)ини(е|и)(\s|\-|\_)(К|к)амни/
      },
      {
        name: 'Втузгородок',
        matcher: /(В|в)(Т|т)(У|у)(З|з)((Г|г)ородок)?/
      },
      {
        name: 'Юго-Западный',
        matcher: /(Ю|ю)го\s?(-|\s|\_)?\s?(З|з)апад(ный)?|Ю(\-|\_|\s)?З/
      }
    ];
  }

  getTests () {

    return _(this)
      .chain()
      .mapValues((entity) => {
        if (_.isArray(entity)) {
          return _(entity)
            .chain()
            .filter((object) => {
              return !_.isUndefined(object.matcher);
            })
            .value();
        }
        else {
          return null;
        }
      })
      .pick(_.isArray)
      .value();
  }

  getInitialState () {

    return _.mapValues(this, (entity) => {
      if (_.isArray(entity)) {
        return _.map(entity, (item) => {
          var clone = _.clone(item);
          clone.active = item.isDefault ? true : false;
          return clone;
        });
      }
      else {
        return entity;
      }
    });
  }

  processApartment (apartment, state) {

    let getActive = (key) => {
      return _(state[key]).isArray() ? _.findWhere(state[key], { active: true }) : null;
    };

    if (state.withoutRejected && apartment.rejectReasons.length > 0) {
      return false;
    }
    else if (apartment.price.number < state.from || apartment.price.number > state.to) {
      return false;
    }
    else if (!apartment.photos && state.shouldHavePhotos) {
      return false;
    }
    else if (apartment.type !== getActive('type').name && !getActive('type').dontFilter) {
      return false;
    }
    else if (getActive('type').hasRooms && apartment.rooms !== getActive('rooms').name && !getActive('rooms').dontFilter) {
      return false;
    }
    else if (apartment.address.city !== getActive('city').name) {
      return false;
    }
    else if (getActive('city').hasDistricts && apartment.address.district !== getActive('district').name && !getActive('district').dontFilter) {
      return false;
    }
    else {
      return true;
    }
  }
}

export default new Filter();
