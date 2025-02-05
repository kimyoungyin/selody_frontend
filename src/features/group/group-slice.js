import { toast } from "react-toastify";

import { createSlice } from "@reduxjs/toolkit";

import {
	createGroup,
	deleteGroup,
	getGroupList,
	updateGroup,
	leaveGroup,
} from "./group-service.js";

const initialState = {
	group: null,
	groupList: [],
	isLoading: false,
};

const groupSlice = createSlice({
	name: "group",
	initialState,
	reducers: {
		selectGroup: (state, { payload }) => {
			state.group = payload;
		},
	},
	extraReducers: (bulider) => {
		bulider
			.addCase(createGroup.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGroup.fulfilled, (state) => {
				state.isLoading = false;
				toast.success("그룹 생성에 성공하셨습니다!");
			})
			.addCase(createGroup.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getGroupList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGroupList.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.groupList = payload.groupList;
			})
			.addCase(getGroupList.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(deleteGroup.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGroup.fulfilled, (state) => {
				state.isLoading = false;
				toast.success("그룹을 삭제하는데 성공하였습니다.");
			})
			.addCase(deleteGroup.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(updateGroup.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateGroup.fulfilled, (state) => {
				state.isLoading = false;
				toast.success("그룹리더 변경에 성공하였습니다.");
			})
			.addCase(updateGroup.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(leaveGroup.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(leaveGroup.fulfilled, (state) => {
				state.isLoading = false;
				toast.success("그룹을 탈퇴하였습니다.");
			})
			.addCase(leaveGroup.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const { selectGroup } = groupSlice.actions;

export default groupSlice.reducer;
