package net.circle.service.util;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;
import javax.ws.rs.core.MultivaluedMap;

import org.jboss.resteasy.plugins.providers.multipart.InputPart;

import net.circle.business.util.ImagemUtil;
import net.circle.domain.entity.Foto;
import net.circle.service.util.exception.FormatoInvalidoException;

public class InputPartUtil {
	
	public final static String[] fotoFormatos = { "PNG", "JPG", "JPEG", "BMP" };
	
	public static String getFileName(MultivaluedMap<String, String> header) {

		String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
		System.out.println(Arrays.asList(contentDisposition));
		for (String filename : contentDisposition) {
			if ((filename.trim().startsWith("filename"))) {

				String[] name = filename.split("=");

				String finalFileName = name[1].trim().replaceAll("\"", "");
				return finalFileName;
			}
		}
		return "unknown";
	}
	
	public static List<Foto> getListFotoEntity(List<InputPart> inputPartList) throws FormatoInvalidoException, Exception {
		var fotos = new ArrayList<Foto>();
		for(InputPart inputPart : inputPartList) {
			String fileName = InputPartUtil.getFileName(inputPart.getHeaders());

			var extensao = fileName.toUpperCase().substring(fileName.lastIndexOf(".") + 1);

			if (!Arrays.asList(fotoFormatos).contains(extensao))
				throw new FormatoInvalidoException();

			// convert the uploaded file to inputstream
			InputStream inputStream = inputPart.getBody(InputStream.class, null);
			var foto = new Foto();
			foto.setOriginal(new SerialBlob(inputStream.readAllBytes()));
			foto.setExtensao(extensao);
			foto.setArquivo(new SerialBlob(ImagemUtil.getTratamentoJPG(foto.getOriginal().getBinaryStream().readAllBytes())));
			foto.setThumbnail(new SerialBlob(ImagemUtil.getThumbnailFromJPG(foto.getArquivo().getBinaryStream().readAllBytes())));
			fotos.add(foto);
		}
		return fotos;
	}

}
