import { useCallback } from "react";
import PropTypes from "prop-types";
import { goTo } from "@/utils/routerActions";
import { LeftIcon } from "@/components/Icons/LeftIcon";
import { Link, LinkContent } from "./BackLink.styles";

const BackLink = ({ anchor, backLink, style }) => {
  const onBackClick = useCallback(() => goTo(backLink), [backLink]);

  return (
    <Link style={style} onClick={onBackClick}>
      <LinkContent>
        <LeftIcon />
      </LinkContent>
      {anchor && <LinkContent>{anchor}</LinkContent>}
    </Link>
  );
};

BackLink.propTypes = {
  anchor: PropTypes.string,
};

export { BackLink };
