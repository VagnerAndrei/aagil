import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//@WebServlet(urlPatterns = { "/registro", "/acesso", "/sobre", "/atletas/*" })
public class WebServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
		// we do not set content type, headers, cookies etc.
		// resp.setContentType("text/html"); // while redirecting as
		// it would most likely result in an IllegalStateException

		// "/" is relative to the context root (your web-app name)
		resp.sendRedirect(req.getRequestURI().contains("atletas/")
				? "../?p=atleta&id=" + req.getRequestURI().substring(req.getRequestURI().lastIndexOf("/") + 1)
				: req.getRequestURI().contains("atletas") ? "?p=atletas"
						: "?p=" + req.getRequestURI().substring(req.getRequestURI().lastIndexOf("/") + 1));
	}

	public static void main(String[] args) {
		String s = "/atleta/12";
		System.out.println(s.substring(s.lastIndexOf("/") + 1));
	}

}