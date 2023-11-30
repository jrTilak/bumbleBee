const Home = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <h1>BumbleBee</h1>
          <h2>AI Chatbot ft ChatGpt</h2>
          <p>
            BumbleBee is an AI chatbot that is trained on a large corpus of
            human conversation data. It is able to generate new human-like
            responses to new inputs. It is able to answer questions, tell jokes,
            and even talk about itself.
          </p>
        </div>
        <div>
          <img
            className="object-cover h-24 w-24"
            style={{ height: "100px", width: "100px" }}
            src="https://hdqwalls.com/download/transformers-bumblebee-fj-2160x3840.jpg"
          />
          <img
            style={{ height: "100px", width: "100px" }}
            className="object-cover h-24 w-24"
            src="https://th.bing.com/th/id/R.85c1e73153e581e6754505e01d4d1b4f?rik=NmljAod%2biap0qg&pid=ImgRaw&r=0"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
