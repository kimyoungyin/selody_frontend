import React from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import CalendarContainer from "@/components/Common/CalendarContainer";

// import { closeModal, openModal } from "@/features/ui/ui-slice.js";

import GroupHeader from "../components/Header/GroupHeader/GroupHeader";
import Header from "../components/Header/Header/Header";
import PersonalTodoList from "../components/PersonalTodoList/PersonalTodoList/PersonalTodoList";

const MainContainer = styled.main`
	display: flex;
	justify-content: center;
	padding: 50px 60px 0;
	font-family: "Inter", sans-serif;
`;

const PersonalSchedulePage = () => {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();

	// const createGroupHandler = () => {
	// 	dispatch(closeModal());
	// 	navigate("/share");
	// 	dispatch(openModal({ type: "SHARE_PAGE_CREATE" }));
	// };

	return (
		<>
			<Header />
			<GroupHeader />
			{/* {isModalOpen && (
				<BaseModal bg="#000">
					<div className="create-group">
						<h2>공유 페이지를 생성해서</h2>
						<h2>일정을 공유할 사람들을 초대하고</h2>
						<h2>함께 일정을 관리해보세요!</h2>
					</div>
					<button
						className="create-group-btn"
						type="button"
						onClick={createGroupHandler}
					>
						공유 페이지 생성하기
					</button>
				</BaseModal>
			)} */}
			<MainContainer>
				<CalendarContainer type="PERSONAL" />
				<PersonalTodoList />
			</MainContainer>
		</>
	);
};

export default PersonalSchedulePage;
