defmodule CommentboxWeb.LoginController do
  use CommentboxWeb, :controller

  def login(conn, %{"username" => username}) do
    json(conn, %{token: Phoenix.Token.sign(conn, "user salt", username), username: username})
  end

  def validateToken(conn, %{"token" => token}) do
    try do
      case Phoenix.Token.verify(conn, "user salt", token, max_age: 86400) do
        {:ok, username} ->
          json(conn, %{isAuthenticated: true, username: username})
        {:error, _} ->
          json(conn, %{isAuthenticated: false})
      end
    rescue
      e in KeyError -> e
                       json(conn, %{isAuthenticated: false})
    end
  end
end