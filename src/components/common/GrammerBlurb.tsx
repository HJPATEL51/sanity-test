import classNames from "classnames";
import React from "react";
import Description from "../description";

interface Props {
  grammarBlurb: any[];
  description: any;
  showMore: any;
  setShowMore: any;
}

const GrammarBlurb: React.FC<Props> = ({
  grammarBlurb,
  description,
  showMore,
  setShowMore,
}) => {
  const joinedString = grammarBlurb.join(
    " <span class='ml-[10px] mr-[10px] text-[#a2a2a2] dark:text-white'> | </span> "
  );

  const onClickReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div
        className="text-[14px] font-medium font-[GT-America-Standard-Medium-Trial] text-primary leading-5 dark:text-white"
        dangerouslySetInnerHTML={{ __html: joinedString }}
      />
      <p
        className={classNames(
          "text-[14px] text-[#353535] font-[gtamerica-thin] leading-5 dark:text-white",
          { "md:line-clamp-3": !showMore }
        )}
      >
        <Description description={description}/>
      </p>
      {!showMore && (
        <p
          className="hidden md:block text-[11px] pb-[5px] cursor-pointer text-[#353535] font-[gtamerica-thin] leading-5 font-light dark:text-white shadow-[0px_-20px_2px_3px_rgba(255,255,255,0.87)]"
          onClick={onClickReadMore}
        >
          <span className="w-max border border-[#353535] border-t-0 border-r-0 border-l-0">
            Read More
          </span>
        </p>
      )}
    </div>
  );
};

export default GrammarBlurb;
