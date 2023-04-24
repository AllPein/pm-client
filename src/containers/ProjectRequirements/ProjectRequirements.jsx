import React, { useMemo, useState } from "react";
import * as UI from "./ProjectRequirements.styles";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Input } from 'antd';

import { UserRoles, ProjectRoles } from "@/enums/Role";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { addNewRequirement, updateRequirement } from "@/actions/projectView/projectView";

const ProjectRequirements = ({ user, project }) => {
  const [isAddingReqs, setIsAddingReqs] = useState(false);
  const [newRequirement, setNewRequirement] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const disabled = useMemo(() => {
    return (
      loading ||
      user.role === UserRoles.ADMIN ||
      user.projectRole === ProjectRoles.PARTICIPANT ||
      !project.participants.find((p) => p.user.id === user.id)
    );
  }, [loading, project.participants, user.id, user.projectRole, user.role]);

  const handleChangeNewRequirement = (e) => {
    setNewRequirement(e.target.value);
  }

  const handleCloseAdd = () => {
    setIsAddingReqs(false);
    setNewRequirement('');
  }
  
  const handleAddRequirement = () => {
    setLoading(true);

    dispatch(addNewRequirement([{
      name: newRequirement,
      checked: false
    }], project.id));

    handleCloseAdd();

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  const handleCheck = (req) => {
    setLoading(true);

    dispatch(updateRequirement({
      id: req.id,
      checked: !req.checked
    }, project.id));

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }


  return (
    <UI.Wrapper>
      <UI.FieldName>Требования к проекту</UI.FieldName>
      <div>
        {project.checklist?.map((req) => (
          <div key={req.id}>
            <Checkbox
              checked={req.checked}
              disabled={disabled}
              onChange={() => handleCheck(req)}
            >
              {req.name}
            </Checkbox>
          </div>
        ))}
      </div>
      {
        isAddingReqs && (
          <UI.InputWrapper>
            <Input
              autoFocus
              value={newRequirement}
              onChange={handleChangeNewRequirement}
              size='small'
            />
            <Button
              icon={<CloseOutlined />}
              style={{ marginLeft: 20, padding: 5 }}
              onClick={handleCloseAdd} 
            />
            <Button
              icon={<CheckOutlined />}
              onClick={handleAddRequirement}
              style={{ marginLeft: 20, padding: 5 }}
            />
          </UI.InputWrapper>
        )
      }
      {!isAddingReqs && !disabled &&
        (
          <UI.StyledButton type='primary' onClick={() => setIsAddingReqs(true)}>
            Добавить требования
          </UI.StyledButton>
        )
      }
    </UI.Wrapper>
  );
};

export { ProjectRequirements };
