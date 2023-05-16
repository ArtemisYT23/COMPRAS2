import axios from "axios";
import { CoreInstance } from "../../Config/axios";

const initialState = {
    VerifyActiveDoc: false,
    DocumentInfo: [],
    FilesSave: [],
    Entities: null,
    ValueDefault: '..cargando',
    PagesFiles: 0,
}

const GET_REQUEST_DOCUMENT_DATA = "GET_REQUEST_DOCUMENT_DATA";
const GET_REQUEST_DOCUMENT_DATA_ERRORS = "GET_REQUEST_DOCUMENT_DATA_ERRORS";
const GET_ALL_FILES_DOCUMENT = "GET_ALL_FILES_DOCUMENT";
const GET_FILES_DOCUMENT_ERRORS = "GET_FILES_DOCUMENT_ERRORS";
const GET_ENTITIES_PROVIDER = "GET_ENTITIES_PROVIDER";
const GET_ENTITIES_PROVIDER_ERRORS = "GET_ENTITIES_PROVIDER_ERRORS";
const COUNTER_FILES_CHANGER = "COUNTER_FILES_CHANGER";
const ACTIVE_FORM_VALIDATE = "ACTIVE_FORM_VALIDATE";
const INACTIVE_FORM_VALIDATE = "INACTIVE_FORM_VALIDATE";
const ACTIVE_FORM_VALIDATE_ERROR = "ACTIVE_FORM_VALIDATE_ERROR";

export default function DocumentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REQUEST_DOCUMENT_DATA:
        case GET_REQUEST_DOCUMENT_DATA_ERRORS:
        case GET_ALL_FILES_DOCUMENT:
        case GET_FILES_DOCUMENT_ERRORS:
        case GET_ENTITIES_PROVIDER:
        case GET_ENTITIES_PROVIDER_ERRORS:
        case COUNTER_FILES_CHANGER:
        case ACTIVE_FORM_VALIDATE:
        case INACTIVE_FORM_VALIDATE:
        case ACTIVE_FORM_VALIDATE_ERROR:
            return action.payload;
        default:
            return state;
    }
}

//cambiar numero de pagina
export const changeNumberFiles = (count) => async (dispatch, getState) => {
    const { documentary } = getState();
    dispatch({
        type: COUNTER_FILES_CHANGER,
        payload: { ...documentary, PagesFiles: count }
    })
}

//validar si el formulario esta esta activo o ya fue respondido
export const validateFormActive = (doc) => async (dispatch, getState) => {
    const { documentary } = getState();
    try {
        const response = await CoreInstance.get(`verifyform2/${doc}`);
        if(response.status == 200){
            if(response.data == true){
            dispatch({
                type: ACTIVE_FORM_VALIDATE,
                payload: { ...documentary, VerifyActiveDoc: response.data }
            })
            dispatch(getInfoDocument(doc));
        } if (response.data == false){
            dispatch({
                type: INACTIVE_FORM_VALIDATE,
                payload: { ...documentary, VerifyActiveDoc: response.data }
            })
        }
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: ACTIVE_FORM_VALIDATE_ERROR,
            payload: { ...documentary, VerifyActiveDoc: false }
        })
    }
}


//Traer todos los datos del primer formulario
export const getInfoDocument = (doc) => async (dispatch, getState) => {
    const { documentary } = getState();
    try {
        const response = await CoreInstance.get(`getdatasecondform/${doc}`);
        if (response.status == 200) {
            dispatch({
                type: GET_REQUEST_DOCUMENT_DATA,
                payload: { ...documentary, DocumentInfo: response.data.indiceLista },
            })
            dispatch(getFileSaveDocument(doc));
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_REQUEST_DOCUMENT_DATA_ERRORS,
            payload: { ...documentary, DocumentInfo: [] },
        })
    }
};

/*Traer todos los archivos de cotizaciones */
export const getFileSaveDocument = (doc) => async (dispatch, getState) => {
    const { documentary } = getState();
    try {
        const response = await CoreInstance.get(`file/${doc}`,);
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_FILES_DOCUMENT,
                payload: { ...documentary, FilesSave: response.data },
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_FILES_DOCUMENT_ERRORS,
            payload: { ...documentary, FilesSave: [] },
        })
    }
}

//traer todas las entidades 
export const getEntitiesProvider = () => async (dispatch, getState) => {
    const { documentary } = getState();
    try {
        const response = await CoreInstance.get(`entidad`);
        if (response.status == 200) {
            dispatch({
                type: GET_ENTITIES_PROVIDER,
                payload: { ...documentary, Entities: response.data },
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_ENTITIES_PROVIDER_ERRORS,
            payload: { ...documentary, Entities: null }
        })
    }
}