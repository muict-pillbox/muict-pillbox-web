import React, { useEffect, useRef } from "react";

type MonthProps = {
    currentMonth: number;
    currentYear: number;
    onPrevMonthClick: () => void;
    onNextMonthClick: () => void;
};

type CalendarProps = {
    currentMonth: number;
    currentYear: number;
    onDateClick: (date: string) => void;
    onTodayClick: () => void;
};

const Month: React.FC<MonthProps> = ({
    currentMonth,
    currentYear,
    onPrevMonthClick,
    onNextMonthClick,
}) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <div>
            <button onClick={onPrevMonthClick}>Previous</button>
            <span>{`${monthNames[currentMonth]} ${currentYear}`}</span>
            <button onClick={onNextMonthClick}>Next</button>
        </div>
    );
};

const Calendar: React.FC<CalendarProps> = ({
    currentMonth,
    currentYear,
    onDateClick,
    onTodayClick,
}) => {
    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const createCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth).getDay();
        const weeks = [];

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const days = [];

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay || date > daysInMonth(currentMonth, currentYear)) {
                    days.push("");
                } else {
                    const day = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
                    days.push(day);
                    date++;
                }
            }

            weeks.push(days);
        }

        return weeks;
    };

    const isToday = (day: string): boolean => {
        const today = new Date();
        const dayDate = new Date(day);
        return (
          dayDate.getDate() === today.getDate() &&
          dayDate.getMonth() === today.getMonth() &&
          dayDate.getFullYear() === today.getFullYear()
        );
      };

    const weeks = createCalendar();

    return (
        <>
        <button onClick={onTodayClick}>Today</button>
        <table id="calendar">
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
                {weeks.map((week, i) => (
                    <tr key={i}>
                        {week.map((day, j) => (
                            <td key={j}>
                                {day && (
                                    <button
                                        onClick={() => onDateClick(day)}
                                        className={isToday(day) ? "today" : ""}
                                    >
                                        {new Date(day).getDate()}
                                    </button>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
};

const CalendarApp: React.FC = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState("");
    const modalText = useRef<HTMLTextAreaElement>(null);

    const closeModalAndSave = () => {
        if (selectedDate && modalText.current) {
            localStorage.setItem(selectedDate, modalText.current.value);
        }
        setModalOpen(false);
    };

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
        setModalOpen(true);
    };

    const handleTodayClick = () => {
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
    };

    useEffect(() => {
        if (modalOpen && modalText.current) {
            modalText.current.value = localStorage.getItem(selectedDate) || "";
        }
    }, [modalOpen, selectedDate]);

    return (
        <div>
            <Month
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPrevMonthClick={() => {
                    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
                    if (currentMonth === 0) {
                        setCurrentYear((prev) => prev - 1);
                    }
                }}
                onNextMonthClick={() => {
                    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
                    if (currentMonth === 11) {
                        setCurrentYear((prev) => prev + 1);
                    }
                }}
            />
            <Calendar
                currentMonth={currentMonth}
                currentYear={currentYear}
                onDateClick={handleDateClick}
                onTodayClick={handleTodayClick}
            />
            {modalOpen && (
                <div>
                    <h2>
                        Selected date: {selectedDate}
                        <button onClick={() => setModalOpen(false)}>Close</button>
                    </h2>
                    <textarea ref={modalText}></textarea>
                    <button onClick={closeModalAndSave}>Save</button>
                </div>
            )}
        </div>
    );
};

export default CalendarApp;