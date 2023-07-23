import React, { useState } from "react";
import Chart from "react-google-charts";

function Index() {
  const [note, setNote] = useState(null);
  const [foodN, setFoodN] = useState({
    data: null,
    options: {
      title: "Foodies",
      pieHole: 0.4,
      // is3D: true,
      pieSliceTextStyle: {
        color: "black",
      },
    },
  });
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };
  const handlesubmit = async () => {
    if (note === null || !("Name" in note)) {
      console.log("Enter correct values");
    } else {
      await fetch("http://127.0.0.1:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      })
        .then((response) => response.json())
        .then((data) => {
          setFoodN((prevAge) => {
            prevAge.data = data;
            return { ...prevAge };

          });
        })
        .catch((error) => {
          console.error("Failed to save data:", error);
        });
    }
    
    console.log(foodN);
  };
  return (
    <div>
      <div className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-xl-6">
                <div className="card rounded-3 bg-white">
                  <div className="card-body p-4 p-md-5 bg-dark text-light">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Foodies</h3>

                    <div className="px-md-2">
                      <div className="form-outline mb-4">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="Name" value={"vegetarian"} onChange={onchange} />
                          <label className="form-check-label" htmlFor="Name">
                            Vegetarian
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="Name" value={"Non-vegetarian"} onChange={onchange} />
                          <label className="form-check-label" htmlFor="Name">
                            Non Vegetarian
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-success btn-lg mb-1" onClick={handlesubmit}>
                        Submit Here
                      </button>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="card mb-4">
                          {/* <div className="card-header">Gender</div> */}
                          <div className="card-body text-dark">
                            {foodN.data === null ? "Empty":<Chart chartType="PieChart" data={foodN.data} options={foodN.options} width="100%" height="500px" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
