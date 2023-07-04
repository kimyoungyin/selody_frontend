import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Wrapper } from "./CalendarContainer.styles";

const CustomCalendar = ({
	calendarRef,
	fullCalendarEvents,
	currentYear,
	currentMonth,
	handleDateChange,
}) => {
	return (
		<Wrapper data-testid="calendar-container">
			<div className="calendar">
				<div className="date-selector">
					<select
						className="date-dropdown"
						value={`${currentYear}-${currentMonth}`}
						onChange={(e) => {
							const [year, month] = e.target.value.split("-");
							handleDateChange(year, parseInt(month, 10) - 1);
						}}
					>
						{Array.from(
							{ length: 5 },
							(_, i) => new Date().getFullYear() + i,
						).map((year) =>
							Array.from({ length: 12 }, (_, j) => j + 1).map((month) => (
								<option key={`${year}-${month}`} value={`${year}-${month}`}>
									{year}년 {month}월
								</option>
							)),
						)}
					</select>
				</div>
				<FullCalendar
					ref={calendarRef}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					events={fullCalendarEvents}
					headerToolbar={{
						left: "",
						center: "title",
						right: "dayGridMonth,timeGridWeek",
					}}
					selectable={true}
					weekends={true}
					allDaySlot={false}
					locale="ko"
					dayCellContent={(renderInfo) =>
						renderInfo.dayNumberText.replace("일", "")
					}
					height={750}
				/>
			</div>
		</Wrapper>
	);
};

export default CustomCalendar;
