import styled from "styled-components";

export const Subtitle = styled.div`
  color: #e5e5e5;
  font-size: 2rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  // align-items:center;
`;
export const Container = styled.div`
  color: #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.div`
  color: #e5e5e5;
  font-size: 45px;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  text-align: center;
  // align-items:center;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
`;
export const TextArea = styled.textarea`
  padding: 5px;
  /* margin-bottom: 10px; */
  background-color: transparent;
  outline: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  /* border-bottom: 10px solid violet; */
  /* width: 20rem; */
  width: 68%;
  color: #a5a5a5;
  resize: vertical;
`;
export const Label = styled.label`
  margin-right: 10px;
  text-align: left;
  /* width: 15rem; */
  width: 50%;
`;
export const Submit = styled.input`
  background-color: #5a69b5;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  font-size: 20px;
  margin-top: 15px;
`;
export const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
  background-color: transparent;
  outline: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  /* border-bottom: 10px solid violet; */
  /* width: 20rem; */
  width: 68%;
  color: #a5a5a5;
`;

export const Select = styled.select`
  padding: 5px;
  margin-bottom: 10px;
  background-color: transparent;
  outline: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  /* border-bottom: 10px solid violet; */
  /* width: 20rem; */
  width: 68%;
  color: "#a5a5a5";
`;

export const Option = styled.option`
  padding: 5px;
  margin-bottom: 10px;
  background-color: transparent;
  outline: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  /* border-bottom: 10px solid violet; */
  width: 20rem;
`;
