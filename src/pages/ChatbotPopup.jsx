import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentStep, setCurrentStep] = useState("greeting");
  const [appointmentData, setAppointmentData] = useState({
    hospitalId: null,
    departmentId: null,
    title: "",
    time: "",
  });
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const messagesEndRef = useRef(null);

  const fetchHospitals = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/hospital/search?query=",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error fetching hospitals. Please try again later.",
          sender: "bot",
        },
      ]);
    }
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setMessages([
        { text: "Hello! How can I assist you today?", sender: "bot" },
        {
          text: "Please choose an option:",
          sender: "bot",
          options: [
            { text: "Book an appointment", value: "book" },
            { text: "Track an appointment", value: "track" },
          ],
        },
      ]);
      setCurrentStep("greeting");
      fetchHospitals();
    }
  }, [isOpen, fetchHospitals]);

  const handleOptionSelect = useCallback(
    (option) => {
      setMessages((prev) => [...prev, { text: option.text, sender: "user" }]);
      if (option.value === "book") {
        setMessages((prev) => [
          ...prev,
          {
            text: "Please select a hospital:",
            sender: "bot",
            options: hospitals.map((h) => ({ text: h.name, value: h.id })),
          },
        ]);
        setCurrentStep("selectHospital");
      } else if (option.value === "track") {
        setMessages((prev) => [
          ...prev,
          { text: "Please enter your appointment ID:", sender: "bot" },
        ]);
        setCurrentStep("enterAppointmentId");
      }
    },
    [hospitals]
  );

  const handleHospitalSelect = useCallback((hospital) => {
    setAppointmentData((prev) => ({ ...prev, hospitalId: hospital.value }));
    setMessages((prev) => [
      ...prev,
      { text: `You selected ${hospital.text}`, sender: "user" },
      { text: "Fetching departments...", sender: "bot" },
    ]);
    setCurrentStep("selectDepartment");
  }, []);

  const handleDepartmentSelect = useCallback((department) => {
    setAppointmentData((prev) => ({ ...prev, departmentId: department.value }));
    const dateOptions = [
      new Date(),
      new Date(Date.now() + 24 * 60 * 60 * 1000),
      new Date(Date.now() + 48 * 60 * 60 * 1000),
    ].map((date) => ({
      text: date.toLocaleDateString(),
      value: date.toISOString().split("T")[0],
    }));
    setMessages((prev) => [
      ...prev,
      { text: `You selected ${department.text}`, sender: "user" },
      {
        text: "Please select a date for your appointment:",
        sender: "bot",
        options: dateOptions,
      },
    ]);
    setCurrentStep("selectDate");
  }, []);

  const handleDateSelect = useCallback((date) => {
    setAppointmentData((prev) => ({ ...prev, time: date.value }));
    const timeOptions = [
      { text: "09:00 AM", value: "09:00" },
      { text: "10:00 AM", value: "10:00" },
      { text: "12:00 PM", value: "12:00" },
      { text: "01:00 PM", value: "13:00" },
      { text: "03:00 PM", value: "15:00" },
    ];
    setMessages((prev) => [
      ...prev,
      { text: `Selected date: ${date.text}`, sender: "user" },
      { text: "Please select a time:", sender: "bot", options: timeOptions },
    ]);
    setCurrentStep("selectTime");
  }, []);

  const handleTimeSelect = useCallback(
    (time) => {
      const [hours, minutes] = time.value.split(":");
      const dateObj = new Date(appointmentData.time);
      dateObj.setUTCHours(parseInt(hours, 10), parseInt(minutes, 10));
      const fullTime = dateObj.toISOString();
      setAppointmentData((prev) => ({ ...prev, time: fullTime }));
      setMessages((prev) => [
        ...prev,
        { text: `Selected time: ${time.text}`, sender: "user" },
        { text: "Please enter a title for your appointment:", sender: "bot" },
      ]);
      setCurrentStep("enterTitle");
    },
    [appointmentData.time]
  );

  const handleTitleSubmit = useCallback((title) => {
    setAppointmentData((prev) => ({ ...prev, title }));
    setMessages((prev) => [
      ...prev,
      { text: `Appointment title: ${title}`, sender: "user" },
      { text: "Booking your appointment...", sender: "bot" },
    ]);
    bookAppointment();
  }, []);

  const bookAppointment = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/patient/book-appointment",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages((prev) => [
        ...prev,
        {
          text: `Appointment booked successfully! Your appointment ID is ${response.data.appointment.id}`,
          sender: "bot",
        },
        {
          text: "Thank you for using our service. Is there anything else I can help you with?",
          sender: "bot",
        },
        {
          text: "Please choose an option:",
          sender: "bot",
          options: [
            { text: "Book another appointment", value: "book" },
            { text: "Track an appointment", value: "track" },
            { text: "End chat", value: "end" },
          ],
        },
      ]);
      setAppointmentData({
        hospitalId: null,
        departmentId: null,
        title: "",
        time: "",
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error booking your appointment. Please try again later.",
          sender: "bot",
        },
        { text: "Is there anything else I can help you with?", sender: "bot" },
        {
          text: "Please choose an option:",
          sender: "bot",
          options: [
            { text: "Book an appointment", value: "book" },
            { text: "Track an appointment", value: "track" },
            { text: "End chat", value: "end" },
          ],
        },
      ]);
    }
    setCurrentStep("greeting");
  }, [appointmentData]);

  const handleAppointmentIdSubmit = useCallback(async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/patient/check-appointment-status/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { status, queue } = response.data;
      let message = `Your appointment status is: ${status}`;
      if (status === "Confirmed" && queue) {
        message += `. You are in position ${queue.userPosition} with ${queue.peopleAhead} people ahead of you. The total queue length is ${queue.totalQueueLength}.`;
      }
      setMessages((prev) => [
        ...prev,
        { text: message, sender: "bot" },
        {
          text: "Thank you for using our service. Is there anything else I can help you with?",
          sender: "bot",
        },
        {
          text: "Please choose an option:",
          sender: "bot",
          options: [
            { text: "Book an appointment", value: "book" },
            { text: "Track another appointment", value: "track" },
            { text: "End chat", value: "end" },
          ],
        },
      ]);
    } catch (error) {
      console.error("Error checking appointment status:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error checking your appointment status. Please try again later.",
          sender: "bot",
        },
        { text: "Is there anything else I can help you with?", sender: "bot" },
        {
          text: "Please choose an option:",
          sender: "bot",
          options: [
            { text: "Book an appointment", value: "book" },
            { text: "Track an appointment", value: "track" },
            { text: "End chat", value: "end" },
          ],
        },
      ]);
    }
    setCurrentStep("greeting");
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (inputText.trim() !== "") {
        setMessages((prev) => [...prev, { text: inputText, sender: "user" }]);
        if (currentStep === "enterTitle") {
          handleTitleSubmit(inputText);
        } else if (currentStep === "enterAppointmentId") {
          handleAppointmentIdSubmit(inputText);
        }
        setInputText("");
      }
    },
    [inputText, currentStep, handleTitleSubmit, handleAppointmentIdSubmit]
  );

  const handleOptionClick = useCallback(
    (option) => {
      if (currentStep === "greeting" || option.value === "end") {
        if (option.value === "end") {
          setMessages((prev) => [
            ...prev,
            {
              text: "Thank you for using our service. Have a great day!",
              sender: "bot",
            },
          ]);
          setTimeout(() => {
            toggleChat();
          }, 2000);
        } else {
          handleOptionSelect(option);
        }
      } else if (currentStep === "selectHospital") {
        handleHospitalSelect(option);
      } else if (currentStep === "selectDepartment") {
        handleDepartmentSelect(option);
      } else if (currentStep === "selectDate") {
        handleDateSelect(option);
      } else if (currentStep === "selectTime") {
        handleTimeSelect(option);
      }
    },
    [
      currentStep,
      handleOptionSelect,
      handleHospitalSelect,
      handleDepartmentSelect,
      handleDateSelect,
      handleTimeSelect,
      toggleChat,
    ]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (appointmentData.hospitalId) {
      const fetchDepartments = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:3000/api/v1/hospital/departments/${appointmentData.hospitalId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDepartments(response.data);
          setMessages((prev) => [
            ...prev,
            {
              text: "Please select a department:",
              sender: "bot",
              options: response.data.map((d) => ({
                text: d.name,
                value: d.id,
              })),
            },
          ]);
        } catch (error) {
          console.error("Error fetching departments:", error);
          setMessages((prev) => [
            ...prev,
            {
              text: "Sorry, there was an error fetching departments. Please try again.",
              sender: "bot",
            },
          ]);
        }
      };
      fetchDepartments();
    }
  }, [appointmentData.hospitalId]);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-lg w-80 sm:w-96 overflow-hidden"
          >
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">HealthCare Assistant</h3>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4 bg-gray-100">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.options && (
                    <div className="mt-2 flex flex-wrap justify-end">
                      {message.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleOptionClick(option)}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md mr-2 mb-2 text-sm"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default ChatbotPopup;
