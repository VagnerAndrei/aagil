package net.circle.business.util;

import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Rotation;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.png.PngChunkType;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.bmp.BmpHeaderDirectory;
import com.drew.metadata.exif.ExifIFD0Directory;
import com.drew.metadata.gif.GifHeaderDirectory;
import com.drew.metadata.jpeg.JpegDirectory;
import com.drew.metadata.png.PngDirectory;

public class ImagemUtil {

	public ImagemUtil() {
	}

	public static byte[] getTratamentoJPG(byte[] img) throws Exception {
		final int ALTURA_MAXIMA = 2400;
		Metadata metadata = ImageMetadataReader.readMetadata(new ByteArrayInputStream(img));

		int imageWidth = 0, imageHeight = 0;
		String type = "";
		for (Directory directory : metadata.getDirectories()) {
			// jpeg
			if (directory instanceof JpegDirectory) {
				imageWidth = directory.getInteger(JpegDirectory.TAG_IMAGE_WIDTH);
				imageHeight = directory.getInteger(JpegDirectory.TAG_IMAGE_HEIGHT);
				type = "jpg";
				break;
			}
			// png
			if (directory instanceof PngDirectory) {
				PngDirectory pngDirectory = (PngDirectory) directory;
				PngChunkType pngChunkType = pngDirectory.getPngChunkType();
				if (pngChunkType.equals(PngChunkType.IHDR)) {
					imageWidth = directory.getInteger(PngDirectory.TAG_IMAGE_WIDTH);
					imageHeight = directory.getInteger(PngDirectory.TAG_IMAGE_HEIGHT);
					type = "png";
					break;
				}

			}
			// gif
			if (directory instanceof GifHeaderDirectory) {
				imageWidth = directory.getInteger(GifHeaderDirectory.TAG_IMAGE_WIDTH);
				imageHeight = directory.getInteger(GifHeaderDirectory.TAG_IMAGE_HEIGHT);
				type = "gif";
				break;
			}

			// gif
			if (directory instanceof BmpHeaderDirectory) {
				imageWidth = directory.getInteger(BmpHeaderDirectory.TAG_IMAGE_WIDTH);
				imageHeight = directory.getInteger(BmpHeaderDirectory.TAG_IMAGE_HEIGHT);
				type = "bmp";
				break;
			}

		}

		Rotation rotacao = getRotation(metadata);

		System.out.println("rotacao != null ?" + (rotacao != null));

		System.out.format("\n[original] imageWidth: %s , imageHeight: %s\n", imageWidth, imageHeight);
		System.out.format("\nimageWidth: %s , imageHeight: %s\n", rotacao != null ? imageHeight : imageWidth,
				rotacao != null ? imageWidth : imageHeight);

		BufferedImage image = ImageIO.read(new ByteArrayInputStream(img));

		System.out.println(System.currentTimeMillis());
		int altura = rotacao != null ? imageWidth : imageHeight;
		if (altura > ALTURA_MAXIMA) {
			while (altura > ALTURA_MAXIMA) {
				imageHeight = (int) (imageHeight * 0.95);
				imageWidth = (int) (imageWidth * 0.95);
				altura = rotacao != null ? imageWidth : imageHeight;
			}
			image = Scalr.resize(image, Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, imageWidth, imageHeight);
		} else if (type.equals("jpg"))
			return img;

		System.out.println(System.currentTimeMillis());
		System.out.format("\n[REDUCED] imageWidth: %s , imageHeight: %s\n", rotacao != null ? imageHeight : imageWidth,
				rotacao != null ? imageWidth : imageHeight);

		if (rotacao != null)
			image = Scalr.rotate(image, rotacao);

		// Converter em JPG
		BufferedImage imgJPG;
		System.out.println("type: " + type);
		if (!type.equals("jpg")) {
			imgJPG = new BufferedImage(imageWidth, imageHeight, BufferedImage.TYPE_INT_RGB);
			Graphics2D graphics2D = imgJPG.createGraphics();
			graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
			graphics2D.drawImage(image, 0, 0, imageWidth, imageHeight, null);
		} else
			imgJPG = image;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ImageIO.write(imgJPG, "jpg", bos);

		return bos.toByteArray();
	}

	
	// TODO: USAR SCALR PARA REDIMENSIONAR A IMG, THUMBNAIL FICOU SEM QUALIDADE 
	public static byte[] getThumbnail(byte[] img) throws Exception {
		try {
			BufferedImage imagem = ImageIO.read(new ByteArrayInputStream(img));

			int largura = 300;
			int altura = 160;

			double thumbRatio = (double) largura / (double) altura;

			int larguraImagem = imagem.getWidth();
			int alturaImagem = imagem.getHeight();
			double imageRatio = (double) larguraImagem / (double) alturaImagem;
			if (thumbRatio < imageRatio) {
				altura = (int) (largura / imageRatio);
			} else {
				largura = (int) (altura * imageRatio);
			}
			// Desenha a imagem original para o thumbnail e
			// redimensiona para o novo tamanho

//			BufferedImage thumbImage = new BufferedImage(largura, altura, BufferedImage.TYPE_INT_RGB);
//			Graphics2D graphics2D = thumbImage.createGraphics();
//			graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
//			graphics2D.drawImage(imagem, 0, 0, largura, altura, null);
			imagem = Scalr.resize(imagem, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.AUTOMATIC, largura, altura);

			Rotation rotacao = getRotation(ImageMetadataReader.readMetadata(new ByteArrayInputStream(img)));
			if (rotacao != null)
				imagem = Scalr.rotate(imagem, rotacao);

			// Salva a nova imagem
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			ImageIO.write(imagem, "jpg", bos);
			return bos.toByteArray();
		} catch (Exception e) {
			throw e;
		}

	}

	private static Rotation getRotation(Metadata metadata) throws Exception {
		ExifIFD0Directory exifIFD0 = metadata.getFirstDirectoryOfType(ExifIFD0Directory.class);

		int orientation = exifIFD0 != null ? exifIFD0.getInt(ExifIFD0Directory.TAG_ORIENTATION) : 0;

		switch (orientation) {
		case 6: // [Exif IFD0] Orientation - Right side, top (Rotate 90 CW)
			return Rotation.CW_90;
		case 3: // [Exif IFD0] Orientation - Bottom, right side (Rotate 180)
			return Rotation.CW_180;
		case 8: // [Exif IFD0] Orientation - Left side, bottom (Rotate 270 CW)
			return Rotation.CW_270;
		default:
			return null;
		}

	}
}
