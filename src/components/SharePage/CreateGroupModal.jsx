import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { createGroup } from "@/features/group/group-service.js";
import { closeModal } from "@/features/ui/ui-slice.js";

import BaseModal from "../Base/BaseModal/BaseModal.jsx";

const CreateGroupModal = () => {
	const [shareInput, setShareInput] = useState("");
	const { groupList } = useSelector((state) => state.group);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		const existingGroupName = groupList.find(
			(group) => group.name === shareInput,
		);
		if (existingGroupName) {
			toast.error("이미 존재하는 그룹명입니다.");
			return;
		}

		dispatch(createGroup(shareInput));

		dispatch(closeModal());
	};

	const handleChange = (e) => {
		setShareInput(e.target.value);
	};

	return (
		<BaseModal title="공유 페이지 생성" bg="#fff">
			<div className="content">
				<div className="input">
					<input
						type="text"
						placeholder="공유 페이지 명"
						id="share"
						name="share"
						value={shareInput}
						onChange={handleChange}
					/>
				</div>
				<div className="invite">
					<input
						type="text"
						placeholder="초대코드로 초대하기"
						id="invite"
						name="invite"
					/>
					<button type="button">초대</button>
				</div>
			</div>
			<div className="share-btn">
				<button
					type="submit"
					onClick={handleSubmit}
					disabled={shareInput === ""}
				>
					생성하기
				</button>
			</div>
		</BaseModal>
	);
};

export default CreateGroupModal;
