package com.shopme;

import java.nio.file.Paths;
import java.nio.file.Path;

import org.springframework.context.annotation.Configuration;

//import javax.persistence.criteria.Path;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
//		String categoryImageDirName="../category-images";
//		Path categoryImageDir = Paths.get(categoryImageDirName);
//		String categoryImagePath= categoryImageDir.toFile().getAbsolutePath();
//		registry.addResourceHandler("/category-images/**")
//		.addResourceLocations("file:/"+categoryImagePath+"/");
		exposeDirectory("../category-images", registry);
		
//		String brandLogosDirName = "../brand-logos";
//		Path brandLogosDir = Paths.get(brandLogosDirName);
//		String brandLogosPath = brandLogosDir.toFile().getAbsolutePath();
//		registry.addResourceHandler("/brand-logos/**")
//		.addResourceLocations("file:/"+brandLogosPath + "/");
		exposeDirectory("../brand-logos", registry);
		exposeDirectory("../product-images", registry);
		exposeDirectory("../site-logo", registry);
	}
	
	private void exposeDirectory(String pathPattern, ResourceHandlerRegistry registry) {
		Path path = Paths.get(pathPattern);
		String absolutePath = path.toFile().getAbsolutePath();
		
		String logicalPath = pathPattern.replace("../", "") + "/**";
				
		registry.addResourceHandler(logicalPath)
			.addResourceLocations("file:/" + absolutePath + "/");		
	}
    
}
