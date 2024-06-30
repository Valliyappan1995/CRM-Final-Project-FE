import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const InteractionLog = () => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { contactId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://crm-backend-final-5.onrender.com/bestcrm/interactions/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setInteractions(res.data.interactions);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [contactId]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <PuffLoader
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="interaction-log">
          <h2>Interaction Log</h2>
          {interactions.map((interaction) => (
            <div key={interaction._id} className="interaction-entry">
              <p>{interaction.note}</p>
              <small>By: {interaction.postedBy.name}</small>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default InteractionLog;
