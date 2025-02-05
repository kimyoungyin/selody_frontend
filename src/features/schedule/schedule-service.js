import { createAsyncThunk } from "@reduxjs/toolkit";

import customFetch from "@/components/Base/BaseAxios.js";
import {
	convertToLocalTimezone,
	convertRecurrenceToLocalTimezone,
} from "@/utils/convertToLocalTimeZone.js";
import convertToUTC, {
	generateEndDateTime,
	generateStartDateTime,
} from "@/utils/convertToUTC.js";

export const getSchedule = createAsyncThunk(
	"schedule/getSchedule",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const { month } = state.schedule;
		const { year } = state.schedule;

		const startDateTime = generateStartDateTime(year, month);
		const endDateTime = generateEndDateTime(year, month);

		try {
			const response = await customFetch.get(
				`/api/user/calendar?startDateTime=${startDateTime.replace(
					".000Z",
					"",
				)}&endDateTime=${endDateTime.replace(".000Z", "")}`,
			);
			if (response.status !== 200) {
				throw response.data;
			}

			response.data.nonRecurrenceSchedule = convertToLocalTimezone(
				response.data.nonRecurrenceSchedule,
			);
			response.data.recurrenceSchedule = convertRecurrenceToLocalTimezone(
				response.data.recurrenceSchedule,
			);

			return response.data;
		} catch (error) {
			if (error.response) {
				return thunkAPI.rejectWithValue(error.response.data);
			}
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const createSchedule = createAsyncThunk(
	"schedule/createSchedule",
	async (schedule, thunkAPI) => {
		const {
			title,
			details,
			startDate,
			endDate,
			startTime,
			endTime,
			repeat,
			untilDate,
			untilTime,
		} = schedule;

		const startDateTime = convertToUTC(startDate, startTime);
		const endDateTime = convertToUTC(endDate, endTime);
		const untileDateTime = convertToUTC(untilDate, untilTime);

		const rec = repeat === "none" ? 0 : 1;
		const inter = repeat === "none" ? 0 : 1;

		try {
			const response = await customFetch.post(`/api/user/calendar`, {
				title,
				content: details,
				startDateTime,
				endDateTime,
				freq: repeat,
				recurrence: rec,
				interval: inter,
				until: untileDateTime,
			});
			if (response.status !== 201) {
				throw response.data;
			}
			thunkAPI.dispatch(getSchedule());
			return response.data;
		} catch (error) {
			if (error.response) {
				return thunkAPI.rejectWithValue(error.response.data);
			}
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const deleteSchedule = createAsyncThunk(
	"schedule/deleteSchedule",
	async (id, thunkAPI) => {
		try {
			const response = await customFetch.delete(`/api/user/calendar/${id}`);
			if (response.status !== 204) {
				throw response.data;
			}
			thunkAPI.dispatch(getSchedule());
			return response.data;
		} catch (error) {
			if (error.response) {
				return thunkAPI.rejectWithValue(error.response.data);
			}
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const updateSchedule = createAsyncThunk(
	"schedule/updateSchedule",
	async ({ schedule, id }, thunkAPI) => {
		const {
			title,
			details,
			startDate,
			endDate,
			startTime,
			endTime,
			repeat,
			// notification,
		} = schedule;

		const startDateTime = convertToUTC(startDate, startTime);
		const endDateTime = convertToUTC(endDate, endTime);

		try {
			const response = await customFetch.put(`/api/user/calendar/${id}`, {
				title,
				content: details,
				startDateTime,
				endDateTime,
				freq: repeat,
				recurrence: 0,
			});
			if (response.status !== 201) {
				throw response.data;
			}
			thunkAPI.dispatch(getSchedule());
			return response.data;
		} catch (error) {
			if (error.response) {
				return thunkAPI.rejectWithValue(error.response.data);
			}
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);
