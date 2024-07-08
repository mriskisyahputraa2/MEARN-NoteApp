import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <>
      <div>
        <div className="">
          <div>
            <h6 className="">{title}</h6>
            <span className="">{date}</span>
          </div>
          <MdOutlinePushPin className="" onClick={onPinNote} />
        </div>
        <p className="">{content?.slice(0, 60)}</p>

        <div className="">
          <div className="text-xs text-slate-500">{tags}</div>
          <div className="flex items-center gap-2">
            <MdCreate
              className="icon-btn hover:text-green-600"
              onClick={onEdit}
            />
            <MdDelete
              className="icon-btn hover:text-red-500"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// menit 39.40
export default NoteCard;
