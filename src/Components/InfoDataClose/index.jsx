import styled from "styled-components";

const InfoDataClose = () => {
  return (
    <ContainerHeader>
      <ContainerInfo>
        <ContentLine>
          <Introducction>
            <strong>No se aceptan más respuestas para este formulario</strong> <br />
             El Formulario ha sido deshabilitado
          </Introducction>
        </ContentLine>
      </ContainerInfo>
    </ContainerHeader>
  );
};

export default InfoDataClose;

const ContainerHeader = styled.div`
  width: 900px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 13px;
  margin: 0 0 0.3rem 0;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
    border-radius: 13px;
  }
`;

const ContainerInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const ContentLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 6px solid var(--thirdColor);
  padding: 1rem;
  border-radius: 13px;
`;

const Introducction = styled.p`
  text-align: center;
  text-decoration-style: solid;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 4px solid var(--PrimaryColor);
`;
