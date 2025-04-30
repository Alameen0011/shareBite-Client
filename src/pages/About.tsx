const About = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 font-primary">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-600">
          About ShareBite
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          ShareBite is a real-time food sharing platform that connects donors
          and volunteers to minimize food waste and help those in need. We
          believe in building a community where everyone has access to fresh
          food, driven by compassion and technology.
        </p>
        <p className="text-base md:text-lg text-gray-600">
          At ShareBite, we believe in the power of community and the simple act
          of sharing. Our mission is to connect people, businesses, and
          volunteers to help reduce food waste and make a positive impact on
          society. Through our platform, donors can easily contribute surplus
          food, while volunteers and kiosk managers ensure it gets into the
          hands of those who need it most. We envision a world where food is
          shared, not wasted—where every meal counts. By using technology like
          real-time tracking, messaging, and video calls, we aim to streamline
          the process of food donation and distribution, making it more
          efficient and accessible for everyone involved. Whether you're a
          restaurant looking to donate surplus food, a volunteer eager to make a
          difference, or someone in need of food assistance, ShareBite is here
          to bring people together in the spirit of giving. Join us in our
          mission to create a more sustainable and compassionate world, one meal
          at a time.
        </p>
      </div>
    </section>
  );
};

export default About;
