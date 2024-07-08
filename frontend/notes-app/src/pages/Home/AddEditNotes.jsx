import React, { useState } from "react";

const AddEditNotes = () => {
  return (
    <>
      <div>
        {/* title */}
        <div className="flex flex-col gap-2">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="Go To Gym At 5"
          />
        </div>

        {/* content */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">CONTENT</label>
          <textarea
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            type="text"
            placeholder="Content"
            rows={10}
          />
        </div>

        {/* tags */}
        <div className="mt-3">
          <label className="input-label">TAGS</label>
        </div>

        {/* buttons add */}
        <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
          ADD
        </button>
      </div>
    </>
  );
};

export default AddEditNotes;
