import styled from 'styled-components';

export const DynamicInputItem = styled.div`
  margin-top: 4px;
  margin-bottom: 6px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 4px;
  }

  > .anticon {
    margin-left: 10px;
    font-size: 18px;
  }
`;
