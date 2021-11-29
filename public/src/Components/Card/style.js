import style from 'styled-components';

export default style.div`
  width: 570px;
  height: 300px;
  display: flex;
  margin-top: 235px;
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #c0bdbd;

  .footer {
    flex: 1;
    padding: 10px;
    display: flex;
    align-items: end;
    flex-direction: row;
    padding-right: 35px;
    justify-content: end;
    padding-bottom: 20px;
  }
`;
