import { TUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalType = "user" | "agent" | null;

interface ModalState {
    type: ModalType;
    data: TUser | null;
}

const initialState: ModalState = {
    type: null,
    data: null
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ type: ModalType; data: TUser }>) => {
            console.log(action);
            state.type = action.payload.type;
            state.data = action.payload.data;
        },
        closeModal: (state) => {
            state.type = null;
            state.data = null
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;