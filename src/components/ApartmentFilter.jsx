import React from 'react/addons';
import FluxComponent from 'flummox/component';
import flux from '../flux';

import { DropDownMenu, Checkbox } from 'material-ui';

class ApartmentFilter extends React.Component {

  render() {

    let types = [
      { payload: 'whatever', text: 'Что угодно' },
      { payload: 'private-room', text: 'Комнату' },
      { payload: 'apartment', text: 'Квартиру' }
    ];

    let rooms = [
      { payload: 1, text: '1' },
      { payload: 2, text: '2' },
      { payload: 3, text: '3' },
      { payload: 4, text: '4+' }
    ];

    return (
      <div>
        <span>
          <DropDownMenu menuItems={types} />
          <DropDownMenu menuItems={rooms} />
        </span>
        <span>
          <Checkbox
            name="withPhotosOnly"
            value="value"
            label="Только с фото"
          />
        </span>
      </div>
    );
  }
}

export default ApartmentFilter;
