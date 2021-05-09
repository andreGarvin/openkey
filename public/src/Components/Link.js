import style from 'styled-components';

export default style.p`
  color: #0cb8e2;
  cursor: pointer;
  margin-top: 20px;
  letter-spacing: 1.2px;
  text-decoration: underline;
  text-transform: ${(props) =>
    props.noCapitalization ? 'none' : 'capitalize'};

  &:hover {
    color: #0098be;
  }
`;
