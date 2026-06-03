function QuestionCard({

  question,
  answer,
  difficulty,
  index

}) {

  return (

    <div
      className="
        bg-[#111827]
        border
        border-blue-500/20
        rounded-2xl
        p-6
        shadow-xl
        hover:scale-[1.01]
        transition-all
        duration-300
      "
    >

      {/* TOP SECTION */}
      <div className="flex items-center justify-between mb-4">

        {/* QUESTION NUMBER */}
        <h2 className="text-lg font-bold text-white">

          Question {index + 1}

        </h2>

        {/* DIFFICULTY */}
        <span
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold

            ${
              difficulty === "Beginner"
                ? "bg-green-500/20 text-green-400"

                : difficulty === "Intermediate"
                ? "bg-yellow-500/20 text-yellow-400"

                : "bg-red-500/20 text-red-400"
            }
          `}
        >
          {difficulty}
        </span>

      </div>

      {/* QUESTION */}
      <div className="mb-5">

        <p className="text-xl text-blue-300 font-semibold leading-relaxed">

          {question}

        </p>

      </div>

      {/* ANSWER */}
      <div
        className="
          bg-black/30
          border
          border-white/10
          rounded-xl
          p-4
        "
      >

        <h3 className="text-green-400 font-bold mb-2">

          Suggested Answer

        </h3>

        <p className="text-gray-300 leading-relaxed">

          {answer}

        </p>

      </div>

    </div>
  );
}

export default QuestionCard;