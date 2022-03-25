import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { radioData } from "./data/formdata";
import {
  IFormInputs,
  MenuDataTypes,
  MenuGrpTypes,
  RuleTypes,
} from "./types/commonTypes";
import RadioInput from "./components/RadioInput";
import toast, { Toaster } from "react-hot-toast";
import Button from "./components/ui/Button";

const schema = yup.object().shape({
  menugroup1: yup.string().nullable().required("Menu 1 is required"),
  menugroup2: yup.string().nullable().required("Menu 2 is required"),
  menugroup3: yup.string().nullable().required("Menu 3 is required"),
});

const App = () => {
  //const [conditions, setConditions] = useState<number[]>([]);
  const [menulist, setMenuLists] = useState<MenuGrpTypes[]>([]);

  const {
    watch,
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const watchAllFields = watch();

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    toast(`Success! ${JSON.stringify(data, null, 2)}`);
  };

  useEffect(() => {
    // generate menu lists for mapping
    const newMenuLiist = radioData.menus.map(
      (menugroup: MenuDataTypes[], index: number) => {
        const menugrpid = `menugroup${index + 1}`;
        const newMenu = { id: index + 1, menuname: menugrpid };
        return newMenu;
      }
    );
    setMenuLists([...newMenuLiist]);
  }, []);

  // get and set rules
  const conditions = useMemo(() => {
    let conditions: number[] = [];
    for (let x = 0; x <= menulist.length; x++) {
      const rules: RuleTypes = radioData.rules;
      if (rules[watchAllFields[menulist[x]?.menuname]]) {
        conditions = [
          ...conditions,
          ...rules[watchAllFields[menulist[x]?.menuname]],
        ];
      }
    }
    return conditions;
  }, [watchAllFields]);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    menu: number
  ) => {
    const value = event.target.value;

    // Reset child menus
    for (let x = menu + 1; x < menulist.length; x++) {
      setValue(menulist[x]?.menuname, "", {
        shouldValidate: true,
      });
    }
    setValue(menulist[menu]?.menuname, value, {
      shouldValidate: true,
    });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {radioData.menus.map(
          (menugroup: MenuDataTypes[], menugrpindex: number) => {
            const menugrpid = `menugroup${menugrpindex + 1}`;
            //addMenuList(menugrpindex);
            return (
              <div key={menugrpid}>
                <Header>Menu {menugrpindex + 1}</Header>
                <InputContainer key={menugrpindex}>
                  {menugroup.map((radioitem: MenuDataTypes, index: number) => {
                    return (
                      <InputWrap key={index}>
                        <RadioInput
                          label={radioitem.value}
                          register={register}
                          type="radio"
                          name={menugrpid}
                          disabled={
                            menugrpindex == 0
                              ? false
                              : !getValues(menulist[0]?.menuname) ||
                                conditions.includes(Number(radioitem.id))
                          }
                          value={radioitem.id}
                          checked={getValues(menugrpid) === radioitem.id}
                          onChange={(event) =>
                            handleSelectChange(event, menugrpindex)
                          }
                        />
                      </InputWrap>
                    );
                  })}
                </InputContainer>
                {errors[menugrpid]?.message && (
                  <ErrorMsg>{errors[menugrpid]?.message}</ErrorMsg>
                )}
              </div>
            );
          }
        )}
        <Button type="submit">Order Now !</Button>
      </Form>
      <Toaster />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
`;
const Header = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin: 30px 0 0 0;
`;
const Form = styled.form`
  width: 90%;
  margin: auto;
`;
const InputContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;
const InputWrap = styled.div`
  display: flex;
  width: 50%;
`;
const ErrorMsg = styled.div`
  padding: 8px 20px;
  background: #f8f6f6;
  color: #ff0000;
  font-size: 14px;
`;

export default App;
