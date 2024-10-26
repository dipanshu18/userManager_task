import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center space-y-5 my-10 mx-5 text-wrap">
      <h1 className="text-3xl md:text-6xl font-extrabold text-transparent bg-clip-text p-5 bg-gradient-to-tr from-neutral-600 to-neutral-950">
        User management
      </h1>
      <p className="max-w-3xl text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur
        saepe soluta modi, magni odio in error magnam molestias voluptate
        voluptatibus molestiae doloremque, recusandae non id labore perferendis
        voluptas nulla aperiam ullam quis nobis ex temporibus! Accusamus fugiat
        veniam vitae esse, quod, mollitia inventore beatae itaque sapiente
        facilis officiis, dignissimos exercitationem sed eaque nihil perferendis
        soluta veritatis quis molestiae enim.
      </p>

      <div className="flex gap-5">
        <Link href="/admin/login">
          <button className="py-2 px-6 text-white bg-neutral-950 rounded">
            Admin Login
          </button>
        </Link>

        <Link href="/user/signup">
          <button className="py-2 px-6 text-white bg-neutral-800 rounded">
            Get started
          </button>
        </Link>
      </div>
    </main>
  );
}
