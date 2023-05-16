import styled from "styled-components";
import { ContainerHeader } from "../../Styles/Form";
import { InputText } from "primereact/inputtext";
import { useSelector } from "react-redux";
import "../../Styles/Button/centerForm.css";

const AplicantInfo = () => {
  const { documentary } = useSelector((store) => store);
  const { DocumentInfo, ValueDefault } = documentary;

  return (
    <ContainerHeader>
      <Header>
        <p>Nombre Solicitante</p>
        <div className="p-inputgroup">
          <InputText
            id="inputgroup"
            type="text"
            value={DocumentInfo ? DocumentInfo[3]?.metadataValue : ValueDefault}
            disabled={true}
            className="input-form"
          />
        </div>
      </Header>
      <Header>
        <p>Correo Solicitante</p>
        <div className="p-inputgroup">
          <InputText
            id="inputgroup"
            type="text"
            value={DocumentInfo ? DocumentInfo[4]?.metadataValue : ValueDefault}
            disabled={true}
            className="input-form"
          />
        </div>
      </Header>
      <Header>
        <p>Categoria de Compra</p>
        <div className="p-inputgroup">
          <InputText
            id="inputgroup"
            type="text"
            value={DocumentInfo ? DocumentInfo[2]?.metadataValue : ValueDefault}
            disabled={true}
            className="input-form"
          />
        </div>
      </Header>
    </ContainerHeader>
  );
};

export default AplicantInfo;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  padding: 1.3rem;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    p {
      width: 90%;
    }

    div {
      margin: 1rem 0 0 0;
    }
  }

  p {
    text-align: center;
    text-decoration-style: solid;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 4px solid var(--PrimaryColor);
    margin: 0 1rem 0 0;
    font-weight: bold;
  }
`;
