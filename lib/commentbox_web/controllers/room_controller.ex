defmodule CommentboxWeb.RoomController do
  use CommentboxWeb, :controller

  def getComments(conn, %{"perPage" => perPage, "offset" => offset}) do
    tuple = ConCache.get(:comments_cache, :room)
    if tuple != nil do
      IO.inspect(elem(tuple, 1))
      {offset, _} = Integer.parse(offset)
      {perPage, _} = Integer.parse(perPage)
      stream = offset..(offset + perPage - 1)
               |> Stream.filter(&(&1 < tuple_size(tuple)))
               |> Stream.map(&(Map.put(elem(tuple, &1), :index,  &1 + 1)))
      json(conn, %{messages: Enum.to_list(stream), pageCount: div(tuple_size(tuple), perPage) + 1})
    else
      json(conn, %{messages: [], pageCount: 0})
    end
  end
end