import TextField from '@mui/material/TextField';
import Calendar from '../Calendar/Calendar';

interface IDateField {
    selectedEndDate: Date | null;
    setSelectedEndDate: (date: Date | null) => void;
}

const DateField = ({ selectedEndDate, setSelectedEndDate }: IDateField) => {

    const handleDateChange = (date: Date | null) => {
        setSelectedEndDate(date);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Calendar selectedDate={selectedEndDate} onDateChange={handleDateChange} />

            <TextField
                value={selectedEndDate ? selectedEndDate.toISOString().split('.')[0] + 'Z' : ''}
                InputProps={{
                    readOnly: true,
                }}
            />
        </div>
    );
};

export default DateField;
