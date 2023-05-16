import axios from "axios";
import { CoreInstance, SaveDocumentUpdate } from "../../Config/axios";
import { toast } from "react-hot-toast";

const initialState = {
    valorWinner: 0,
    cotizationWinner: null,
    mailProvider: null,
    rucProvider: null,
    nameProvider: null,
    activeState: false,
    activeStateText: ""
}

const GET_DATA_VALOR_WINNER_COTIZATION = "GET_DATA_VALOR_WINNER_COTIZATION";
const GET_WINNER_COTIZATION = "GET_WINNER_COTIZATION";
const GET_DATA_MAIL_PROVIDER = "GET_DATA_MAIL_PROVIDER";
const GET_DATA_RUC_PROVIDER = "GET_DATA_RUC_PROVIDER";
const GET_DATA_NAME_PROVIDER = "GET_DATA_NAME_PROVIDER";
const GET_STATE_ACTIVE_BY_FORM = "GET_STATE_ACTIVE_BY_FORM";
const GET_STATE_ACTIVE_BY_FORM_ERRORS = "GET_STATE_ACTIVE_BY_FORM_ERRORS";
const GET_STATE_ACTIVE_BY_FORM_INVALIDATE = "GET_STATE_ACTIVE_BY_FORM_INVALIDATE";

export default function InfoDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA_VALOR_WINNER_COTIZATION:
        case GET_WINNER_COTIZATION:
        case GET_DATA_MAIL_PROVIDER:
        case GET_DATA_RUC_PROVIDER:
        case GET_DATA_NAME_PROVIDER:
        case GET_STATE_ACTIVE_BY_FORM:
        case GET_STATE_ACTIVE_BY_FORM_ERRORS:
        case GET_STATE_ACTIVE_BY_FORM_INVALIDATE:
            return action.payload;
        default:
            return state;
    }
}

//Comprobar estado de presupuesto para saber si puede ingresar al formulario
export const getStateByActiveResponse = (action) => async (dispatch, getState) => {
    const { dataState } = getState();
    axios({
        url: `${SaveDocumentUpdate}checkbudget`,
        method: "PUT",
        data: action,
        headers: {
            Accept: "application/json",
        },
    }).then(function (response) {
        if (response.status == 200) {
            if (response.data == true) {
                dispatch({
                    type: GET_STATE_ACTIVE_BY_FORM,
                    payload: { ...dataState, activeState: response.data, activeStateText: "" }
                })
            } if (response.data == false) {
                dispatch({
                    type: GET_STATE_ACTIVE_BY_FORM_INVALIDATE,
                    payload: {
                        ...dataState,
                        activeState: response.data,
                        activeStateText: "El Valor ingresado excede el presupuesto comunicarse con el departamento financiero",
                    }
                })
            }
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_STATE_ACTIVE_BY_FORM_ERRORS,
            payload: { ...dataState, activeState: false }
        })
    })
}

//guardar valor de cotizacion ganadora
export const saveElementSelectedValueWinner = (value) => async (dispatch, getState) => {
    const { dataState } = getState();
    dispatch({
        type: GET_DATA_VALOR_WINNER_COTIZATION,
        payload: { ...dataState, valorWinner: value }
    })
}

//guardar Cotizacion ganadora
export const saveElementSelectedCotizacionWinner = (winner) => async (dispatch, getState) => {
    const { dataState } = getState();
    dispatch({
        type: GET_WINNER_COTIZATION,
        payload: { ...dataState, cotizationWinner: winner }
    })
}

//guardar correo del proveedor
export const saveElementSelectedProviderMail = (mail) => async (dispatch, getState) => {
    const { dataState } = getState();
    dispatch({
        type: GET_DATA_MAIL_PROVIDER,
        payload: { ...dataState, mailProvider: mail }
    })
}

//guardar ruc del proveedor
export const saveElementSelectedProviderRuc = (ruc) => async (dispatch, getState) => {
    const { dataState } = getState();
    dispatch({
        type: GET_DATA_RUC_PROVIDER,
        payload: { ...dataState, rucProvider: ruc }
    })
}

//guardar razon social o nombre del proveedor
export const saveElementSelectedProviderName = (name) => async (dispatch, getState) => {
    const { dataState } = getState();
    dispatch({
        type: GET_DATA_NAME_PROVIDER,
        payload: { ...dataState, nameProvider: name }
    })
}

