export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="bg-alert py-2 px-4 rounded-md no-underline w-[200px] mt-2">
        Logout
      </button>
    </form>
  );
}
