import { useEffect, useRef, useState } from "react";
import { useAccommodations } from "@hooks/useAccommodations";
import { Hotels } from "@components/hotels";
import Countries from "@components/countries";
import Cities from "@components/cities";

function Home() {
  const { accommodations, fetchAccommodations, clearAccommodations } =
    useAccommodations();
  const [showClearBtn, setShowClearBtn] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClearAllData = () => {
    setShowClearBtn(false);
    clearAccommodations();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    setShowClearBtn(!!accommodations);
  }, [accommodations]);

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  onChange={fetchAccommodations}
                />
                {showClearBtn && (
                  <span className="left-pan">
                    <i
                      role="button"
                      onClick={handleClearAllData}
                      className="fa fa-close"
                    ></i>
                  </span>
                )}
              </div>
              {!!accommodations?.hotels.length && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <Hotels hotels={accommodations?.hotels} />
                  <Countries countries={accommodations?.countries} />
                  <Cities cities={accommodations?.cities} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
