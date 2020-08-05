import moment from 'moment';
import generalErrors from '../error-services/general-errors';

class DateTimeValidators {
  validateCreateAppointmentFields (timezone, dateTime) {
    // timezone is required
    if(!timezone) {
      return generalErrors.unprocessableEntityWrongFields(['timezone'], null);
    }
    // verify if timezone name is correct
    if(!moment.tz.zone(timezone)) {
      return generalErrors
        .unprocessableEntityWrongFields(
          ['timezone'],
          'inexistent_timezone_name'
        )
      ;
    }
    // verify if date-time is in the past
    if(moment(dateTime).isBefore(Date.now())) {
      return generalErrors.unprocessableEntity('date_cannot_be_in_the_past');
    }
    // verify if time is at exact hour
    if (
      moment(dateTime).millisecond() != 0
      || moment(dateTime).second() != 0
      || moment(dateTime).minute() != 0
    ){
      return generalErrors.unprocessableEntity('wrong_time_format');
    }
  }
}

export default new DateTimeValidators();
