/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import CardConselor from "./CardConselor";
import SidebarSecond from "../../components/SidebarSecond";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getKonselor } from "../../redux/reducers/konselorReducer";
import { Spinner } from "flowbite-react";

const PemesananPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.konselor);

  const { konselor, isErrored, isLoading } = data;

  const { counselors } = konselor;

  useEffect(() => {
    dispatch(getKonselor());
  }, []);

  console.log(data);

  return (
    <SidebarSecond>
      <div className="min-h-screen p-4">
        <div
          id="cardContainer"
          className="flex flex-wrap mx-auto justify-center lg:justify-start"
        >
          {isLoading ? (
            <h1>
              <Spinner color="purple" aria-label="Purple spinner example" />
              {"  "}Loading...
            </h1>
          ) : isErrored ? (
            <h1>Terjadi Error</h1>
          ) : (
            counselors.map((item) => {
              const rate = item.rate
                ? item.rate.reduce((a, b) => a + b.rate, 0) / item.rate.length
                : 0;

              return (
                <Link
                  onClick={() =>
                    (window.location.href = "/booking/" + item._id)
                  }
                  key={item._id}
                >
                  <CardConselor
                    namaKonselor={item.user_id.fullname}
                    hargaKonselor={item.price ? item.price : 0}
                    ratingKonselor={Math.round(rate)}
                  />
                </Link>
              );
            })
          )}
          {/* <Link to="/booking/1">
            <CardConselor
              namaKonselor={"udin"}
              hargaKonselor={40000}
              ratingKonselor={5}
              imgKonselor={
                "https://images.westend61.de/0001544702pw/handsome-male-doctor-with-clipboard-standing-in-front-of-wall-GIOF12206.jpg"
              }
            />
          </Link> */}
          {/* <Link to="/booking/2">
            <CardConselor
              namaKonselor={"asep"}
              hargaKonselor={45000}
              ratingKonselor={3}
            />
          </Link>
          <Link to="/booking/3">
            <CardConselor
              namaKonselor={"bagus"}
              hargaKonselor={30000}
              ratingKonselor={2}
            />
          </Link> */}
        </div>
      </div>
    </SidebarSecond>
  );
};

export default PemesananPage;
