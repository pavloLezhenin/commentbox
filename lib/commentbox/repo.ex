defmodule Commentbox.Repo do
  use Ecto.Repo,
    otp_app: :commentbox,
    adapter: Ecto.Adapters.Postgres
end
