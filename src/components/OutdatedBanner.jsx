const OutdatedBanner = () => {
  return (
    <div className="w-full flex items-center justify-center fixed top-0 z-10 bg-red-700">
      <p>
        This is an outdated portfolio site. Visit{" "}
        <a className="text-violet-400" href="https://michael.voemel.org/">
          michael.voemel.org
        </a>{" "}
        to checkout the newest version!
      </p>
    </div>
  );
};

export default OutdatedBanner;
