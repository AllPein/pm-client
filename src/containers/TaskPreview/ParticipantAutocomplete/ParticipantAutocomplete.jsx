import { AutoComplete, Avatar } from "antd";
import React, { useMemo } from "react";
import * as UI from "./ParticipantAutocomplete.styles";
import { getAvatarCharacters } from "@/utils/user";

const ParticipantAutocomplete = ({ participants, asigneeId, onSelect }) => {
  const selectedAsignee = useMemo(() => {
    return participants.find((participant) => participant.id === asigneeId);
  }, [participants, asigneeId]);

  const renderItem = (participant) => ({
    value: participant.id,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Avatar style={{ backgroundColor: participant.user.avatarColor }}>
          {getAvatarCharacters(participant.user)}
        </Avatar>
        <p>
          {participant.user.firstName} {participant.user.lastName}
        </p>
      </div>
    ),
  });

  const autocompleteOptions = participants.map((participant) => ({
    ...renderItem(participant),
  }));

  return (
    <UI.Wrapper>
      {selectedAsignee && (
        <Avatar style={{ backgroundColor: selectedAsignee.user.avatarColor }}>
          {getAvatarCharacters(selectedAsignee.user)}
        </Avatar>
      )}

      <AutoComplete
        value={
          selectedAsignee
            ? `${selectedAsignee?.user.firstName} ${selectedAsignee?.user.lastName}`
            : null
        }
        popupClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={200}
        onSelect={onSelect}
        style={{ width: 180 }}
        options={autocompleteOptions}
      />
    </UI.Wrapper>
  );
};

export { ParticipantAutocomplete };
