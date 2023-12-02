import { Accordion } from "flowbite-react";
import { Link } from "react-router-dom";

const FaqLanding = () => {
  return (
    <div className="w-full">
      <Accordion collapseAll>
        <Accordion.Panel>
          <Accordion.Title>Bagaimana Caranya memesan konselor?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Cara memesan konselor adalah cukup mudah, anda hanya perlu
              mengikuti langkah-langkah berikut:
              <ol className="list-decimal pl-5 text-gray-500 dark:text-gray-400">
                <li>
                  Pergi ke dashboard konselor{" "}
                  <Link
                    to={"/booking"}
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    di sini&nbsp;
                  </Link>
                </li>
                <li>Pilih konselor yang anda inginkan</li>
                <li>Pilih jadwal yang anda inginkan</li>
                <li>Lakukan pembayaran</li>
                <li>Konseling</li>
              </ol>
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Apakah pembayaran di sini aman?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Pembayaran incare dapat dijamin 100% aman, karena memakai pihak ke
              3 yaitu Xendit
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Bagaimana caranya mendaftar sebagai konselor?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Cara mendafatar sebagai konselor adalah cukup mudah, anda hanya
                perlu mengikuti langkah-langkah berikut:
              <ol className="list-decimal pl-5 text-gray-500 dark:text-gray-400">
                <li>
                  Pergi ke daftar konselor{" "}
                  <Link
                    to={"/booking"}
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    di sini&nbsp;
                  </Link>
                </li>
                <li>Isi data diri anda</li>
                <li>Upload Dokumen Psikolog anda</li>
                <li>Tunggu Konfirmasi</li>
                <li>Berhasil mendaftar sebagai konselor</li>
              </ol>
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default FaqLanding;
