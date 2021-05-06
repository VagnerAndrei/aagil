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
		var start = System.currentTimeMillis();
		final int ALTURA_MAXIMA = 2400;
		Metadata metadata = ImageMetadataReader.readMetadata(new ByteArrayInputStream(img));

		String type = "";
		for (Directory directory : metadata.getDirectories()) {
			// jpeg
			if (directory instanceof JpegDirectory) {
				type = "jpg";
				break;
			}
			// png
			if (directory instanceof PngDirectory) {
				PngDirectory pngDirectory = (PngDirectory) directory;
				PngChunkType pngChunkType = pngDirectory.getPngChunkType();
				if (pngChunkType.equals(PngChunkType.IHDR)) {
					type = "png";
					break;
				}

			}
			// gif
			if (directory instanceof GifHeaderDirectory) {
				type = "gif";
				break;
			}

			// gif
			if (directory instanceof BmpHeaderDirectory) {
				type = "bmp";
				break;
			}

		}

		Rotation rotacao = getRotation(metadata);

		BufferedImage image = ImageIO.read(new ByteArrayInputStream(img));
		int imageWidth = image.getWidth(), imageHeight = image.getHeight();

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

		if (rotacao != null)
			image = Scalr.rotate(image, rotacao);

		// Converter em JPG
		BufferedImage imgJPG;
		if (!type.equals("jpg")) {
			imgJPG = new BufferedImage(imageWidth, imageHeight, BufferedImage.TYPE_INT_RGB);
			Graphics2D graphics2D = imgJPG.createGraphics();
			// graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
			// RenderingHints.VALUE_INTERPOLATION_BILINEAR);
			graphics2D.drawImage(image, 0, 0, imageWidth, imageHeight, null);
		} else
			imgJPG = image;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ImageIO.write(imgJPG, "jpg", bos);

		System.out.println(System.currentTimeMillis() - start + " ms. getTratamentoJPG(" + String.format("%.2f MB)", (float) img.length / 1024 / 1024));
		return bos.toByteArray();
	}

	public static byte[] getThumbnail(byte[] img) throws Exception {
		try {
			var start = System.currentTimeMillis();
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

			imagem = Scalr.resize(imagem, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.AUTOMATIC, largura, altura);
			Metadata metadata = ImageMetadataReader.readMetadata(new ByteArrayInputStream(img));
			Rotation rotacao = getRotation(metadata);
			if (rotacao != null)
				imagem = Scalr.rotate(imagem, rotacao);

			String type = "";
			for (Directory directory : metadata.getDirectories()) {
				// jpeg
				if (directory instanceof JpegDirectory) {
					type = "jpg";
					break;
				}
				// png
				if (directory instanceof PngDirectory) {
					PngDirectory pngDirectory = (PngDirectory) directory;
					PngChunkType pngChunkType = pngDirectory.getPngChunkType();
					if (pngChunkType.equals(PngChunkType.IHDR)) {
						type = "png";
						break;
					}

				}
				// gif
				if (directory instanceof GifHeaderDirectory) {
					type = "gif";
					break;
				}

				// gif
				if (directory instanceof BmpHeaderDirectory) {
					type = "bmp";
					break;
				}

			}
			BufferedImage imgJPG;
			if (!type.equals("jpg")) {
				imgJPG = new BufferedImage(largura, altura, BufferedImage.TYPE_INT_RGB);
				Graphics2D graphics2D = imgJPG.createGraphics();
				graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
						RenderingHints.VALUE_INTERPOLATION_BILINEAR);
				graphics2D.drawImage(imagem, 0, 0, largura, altura, null);
			} else
				imgJPG = imagem;
			// Salva a nova imagem
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			ImageIO.write(imgJPG, "jpg", bos);
			System.out.println(System.currentTimeMillis() - start + " ms. getThumbnail()");
			return bos.toByteArray();
		} catch (Exception e) {
			throw e;
		}

	}

	public static byte[] getThumbnailFromJPG(byte[] img) throws Exception {
		try {
			var start = System.currentTimeMillis();
			BufferedImage imagem = ImageIO.read(new ByteArrayInputStream(img));

			int largura = 200;
			int altura = 110;

			double thumbRatio = (double) largura / (double) altura;
			double imageRatio = (double) imagem.getWidth() / (double) imagem.getHeight();

			if (thumbRatio < imageRatio) {
				altura = (int) (largura / imageRatio);
			} else {
				largura = (int) (altura * imageRatio);
			}

			imagem = Scalr.resize(imagem, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.FIT_EXACT, largura, altura);

			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			ImageIO.write(imagem, "jpg", bos);
			System.out.println(System.currentTimeMillis() - start + " ms. getThumbnailFromJPG()");
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
