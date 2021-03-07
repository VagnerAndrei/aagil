package net.circle.business.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.jboss.resteasy.util.Base64;

public class Encriptador {
	
	public static String SHA256(String senha)
			throws NoSuchAlgorithmException, UnsupportedEncodingException {
		return Base64.encodeBytes(MessageDigest.getInstance("SHA-256").digest(senha.getBytes("UTF-8")));
	}

	public static String MD5(String senha) throws UnsupportedEncodingException, NoSuchAlgorithmException {
		return Base64.encodeBytes(MessageDigest.getInstance("MD5").digest(senha.getBytes("UTF-8")));
	}

}
