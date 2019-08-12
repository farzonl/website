import { Button } from "@material-ui/core";
import React, { useState } from "react";
import AdvancedGridList, { GridItem } from "../components/ItemGrid";
export type CollectionComponentProps = {
  gridItems: GridItem[];
};

const CollectionComponent = ({ gridItems }: CollectionComponentProps) => {
  const [showMore, changeShowMore] = useState(false);
  const threshold = 8;
  return (
    <div>
      <AdvancedGridList
        gridItems={gridItems.filter((_, i) => {
          return i < (showMore ? gridItems.length : threshold);
        })}
      />
      {gridItems.length > threshold ? (
        <Button
          style={{
            display: "block",
            color: "white",
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto"
          }}
          onClick={() => {
            changeShowMore(old => {
              return !old;
            });
          }}
        >
          {showMore ? "Show Less" : "Show More"}
        </Button>
      ) : null}
    </div>
  );
};

export default CollectionComponent;
