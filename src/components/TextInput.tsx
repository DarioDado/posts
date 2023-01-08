import { FC, InputHTMLAttributes, memo } from 'react';
import styled from 'styled-components';
import { withLogs } from '../hoc/withLogs';

const Input = styled.input`
  height: 36px;
  border-radius: 4px;
  width: 100%;
  padding: 0 8px;
  font-size: 16px;
  border: 3px solid #232465;
  outline: 0;
  &:focus {
    outline: none;
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const TextInputImp: FC<Props> = (props) => {
  return <Input {...props} />;
};

export const TextInput = memo(withLogs(TextInputImp, 'TextInput'));
