import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ICalendar {
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
}

const Calendar = ({ selectedDate, onDateChange }: ICalendar) => {
    const handleChange = (date: Date | null) => {
        onDateChange(date);
    };

    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm:ss"
            placeholderText="Выберите дату конца"
        />
    );
};

export default Calendar;
