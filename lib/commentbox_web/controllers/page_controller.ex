defmodule CommentboxWeb.PageController do
  use CommentboxWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
