import axios from "axios";
import { Accordion } from "flowbite-react";
import { useEffect, useState } from "react";
export default function FaqAccordion() {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/faqs`
      );
      setFaqs(response.data.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Accordion>
        {faqs.map((faq) => (
          <Accordion.Panel key={faq._id}>
            <Accordion.Title>
              <p className="w-[1000px]">{faq.question}</p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {faq.answer}
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </>
  );
}
