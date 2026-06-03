import {
  CircularProgressbar
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";

import DashboardCard from "../components/DashboardCard";
import QuestionCard from "../components/QuestionCard";

function Results() {

  const location = useLocation();

  // SAFE ACCESS
  const analysis = location.state?.analysis;

  // TAB STATE
  const [activeTab, setActiveTab] = useState("overview");

  // DEBUG
  console.log("ANALYSIS DATA:");
  console.log(analysis);

  // NO DATA PROTECTION
  if (!analysis) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <h1 className="text-3xl font-bold text-red-500">

          No Analysis Data Found

        </h1>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* PAGE TITLE */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-blue-600 mb-3">

            AI Analysis Dashboard

          </h1>

          <p className="text-gray-500 text-lg">

            Personalized resume insights and interview preparation

          </p>

        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-4 mb-8">

          {/* OVERVIEW TAB */}
          <button
            onClick={() => setActiveTab("overview")}
            className={`
              px-5
              py-2
              rounded-xl
              font-semibold
              transition-all
              duration-300

              ${
                activeTab === "overview"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            Overview
          </button>

          {/* TECHNICAL TAB */}
          <button
            onClick={() => setActiveTab("technical")}
            className={`
              px-5
              py-2
              rounded-xl
              font-semibold
              transition-all
              duration-300

              ${
                activeTab === "technical"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            Technical
          </button>

          {/* HR TAB */}
          <button
            onClick={() => setActiveTab("hr")}
            className={`
              px-5
              py-2
              rounded-xl
              font-semibold
              transition-all
              duration-300

              ${
                activeTab === "hr"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            HR
          </button>

          {/* APTITUDE TAB */}
          <button
            onClick={() => setActiveTab("aptitude")}
            className={`
              px-5
              py-2
              rounded-xl
              font-semibold
              transition-all
              duration-300

              ${
                activeTab === "aptitude"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            Aptitude
          </button>

        </div>

        {/* OVERVIEW SECTION */}
        {activeTab === "overview" && (

          <>

            {/* TOP GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* ATS SCORE */}
              <DashboardCard title="ATS Score">

                <div className="w-52 h-52 mx-auto">

                  <CircularProgressbar

                    value={analysis.ats_score || 0}

                    text={`${analysis.ats_score || 0}%`}

                    styles={{

                      path: {
                        stroke: "#2563eb",
                        strokeLinecap: "round",
                      },

                      trail: {
                        stroke: "#dbeafe",
                      },

                      text: {
                        fill: "#2563eb",
                        fontSize: "18px",
                        fontWeight: "bold",
                      },

                    }}
                  />

                </div>

              </DashboardCard>

              {/* SKILLS */}
              <DashboardCard title="Skills">

                <div className="flex flex-wrap gap-3">

                  {analysis.skills?.map((skill, index) => (

                    <span
                      key={index}
                      className="
                        bg-blue-100
                        text-blue-700
                        px-4
                        py-2
                        rounded-full
                        font-medium
                        hover:scale-105
                        transition
                      "
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </DashboardCard>

            </div>

            {/* STRENGTHS + WEAKNESSES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* STRENGTHS */}
              <DashboardCard title="Strengths">

                <ul className="list-disc pl-6 space-y-3">

                  {analysis.strengths?.map((item, index) => (

                    <li
                      key={index}
                      className="text-gray-700"
                    >
                      {item}
                    </li>

                  ))}

                </ul>

              </DashboardCard>

              {/* WEAKNESSES */}
              <DashboardCard title="Weaknesses">

                <ul className="list-disc pl-6 space-y-3">

                  {analysis.weaknesses?.map((item, index) => (

                    <li
                      key={index}
                      className="text-gray-700"
                    >
                      {item}
                    </li>

                  ))}

                </ul>

              </DashboardCard>

            </div>

          </>

        )}

        {/* TECHNICAL QUESTIONS */}
        {activeTab === "technical" && (

          <DashboardCard title="Technical Interview Questions">

            <div className="space-y-5">

              {analysis.technical_questions?.map((question, index) => (

                <QuestionCard
                  key={index}
                  question={question.question}
                  answer={question.answer}
                  difficulty={question.difficulty}
                  index={index}
                />

              ))}

            </div>

          </DashboardCard>

        )}

        {/* HR QUESTIONS */}
        {activeTab === "hr" && (

          <DashboardCard title="HR Interview Questions">

            <div className="space-y-5">

              {analysis.hr_questions?.map((question, index) => (

                <QuestionCard
                  key={index}
                  question={question.question}
                  answer={question.answer}
                  difficulty={question.difficulty}
                  index={index}
                />

              ))}

            </div>

          </DashboardCard>

        )}

        {/* APTITUDE QUESTIONS */}
        {activeTab === "aptitude" && (

          <DashboardCard title="Aptitude Questions">

            <div className="space-y-5">

              {analysis.aptitude_questions?.map((question, index) => (

                <QuestionCard
                  key={index}
                  question={question.question}
                  answer={question.answer}
                  difficulty={question.difficulty}
                  index={index}
                />

              ))}

            </div>

          </DashboardCard>

        )}

      </div>

    </div>
  );
}

export default Results;